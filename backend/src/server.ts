import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { setupWebSocket } from './socket';
import { rateLimit, MemoryStore } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import Redis from 'ioredis';
import { env } from './config/env';
import prisma from './lib/prisma';

import employeeRoutes from './routes/employee.routes';
import authSyncRoutes from './routes/authSync.routes';
import matchRoutes from './routes/match.routes';
import searchRoutes from './routes/search.routes';
import recruiterRoutes from './routes/recruiter.routes';
import uploadRoutes from './routes/upload.routes';

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'res.cloudinary.com'],
      connectSrc: ["'self'", env.FRONTEND_URL],
    },
  },
  crossOriginEmbedderPolicy: false, // Required for Cloudinary images usually
}));
app.disable('x-powered-by');

// CORS — locked to frontend origin
const allowedOrigins = [env.FRONTEND_URL];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Redis client
let redisClient: Redis | null = null;
if (env.REDIS_URL) {
  try {
    redisClient = new Redis(env.REDIS_URL);
    redisClient.on('error', () => { redisClient = null; });
  } catch (e) {
    redisClient = null;
  }
}

// Rate Limiting helpers
const getStore = (prefix?: string) => {
  if (redisClient) {
    return new RedisStore({
      // @ts-expect-error - Known issue with RedisStore sendCommand typings
      sendCommand: (...args: string[]) => redisClient!.call(...args),
      ...(prefix && { prefix }),
    });
  }
  return new MemoryStore();
};

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 500 : 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore(),
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many auth attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  store: getStore('rl:auth:'),
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
// Routes
app.use('/api/v1/auth', authSyncRoutes);
app.use('/api/v1/employee', employeeRoutes);
app.use('/api/v1/recruiter', recruiterRoutes);
app.use('/api/v1/match', matchRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Health check
app.get('/', (_req, res) => res.redirect('/health'));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'aetheris-api', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: env.NODE_ENV === 'development' ? err.message : 'Internal server error' });
});

// Create HTTP server
const httpServer = createServer(app);
setupWebSocket(httpServer);

// Graceful shutdown
const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  await prisma.$disconnect();
  process.exit(0);
};
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

httpServer.listen(env.PORT, () => {
  console.log(`AETHERIS API running on port ${env.PORT} [${env.NODE_ENV}]`);
});