import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { setupWebSocket } from './socket';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import prisma from './lib/prisma';

import authRoutes from './routes/auth.routes';
import employeeRoutes from './routes/employee.routes';
import matchRoutes from './routes/match.routes';
import searchRoutes from './routes/search.routes';

const app = express();

// Security headers
app.use(helmet());

// CORS — locked to frontend origin
app.use(cors({
  origin: env.FRONTEND_URL,
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 500 : 100,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.NODE_ENV === 'development' ? 50 : 10,
  message: { error: 'Too many auth attempts, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', apiLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/signup', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/search', searchRoutes);

// Health check
app.get('/', (_req, res) => res.redirect('/health'));
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'aetherisis-api', timestamp: new Date().toISOString() });
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
  console.log(`AETHERISIS API running on port ${env.PORT} [${env.NODE_ENV}]`);
});