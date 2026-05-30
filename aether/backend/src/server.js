import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { rateLimit } from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import { morganMiddleware } from './middleware/logger.middleware.js';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

// ---------------- SECURITY ----------------
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      connectSrc: ["'self'", process.env.FRONTEND_URL],
    }
  },
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

app.use(mongoSanitize());
app.use(hpp());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganMiddleware);

// ---------------- RATE LIMIT (NO REDIS) ----------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests, try again later.'
});

app.use('/api', limiter);

// ---------------- ROUTES ----------------
app.get('/', (req, res) => {
  res.send('AETHERIS API running...');
});

// Import routes safely
import authRoutes from './routes/auth.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import aiRoutes from './routes/ai.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import healthRoutes from './routes/health.routes.js';

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/health', healthRoutes);

// ---------------- OPTIONAL FEATURES (SAFE) ----------------
try {
  const { serverAdapter } = await import('./config/queue/queue.js');
  app.use('/admin/queues', serverAdapter.getRouter());

  const { setupWorkers } = await import('./config/queue/workers.js');

  if (process.env.ENABLE_WORKERS === 'true') {
    setupWorkers();
  }
} catch (err) {
  console.log('Queue system disabled:', err.message);
}

// ---------------- SOCKET (SAFE) ----------------
try {
  const { setupSocket } = await import('./sockets/index.js');
  setupSocket(httpServer);
} catch (err) {
  console.log('Socket disabled:', err.message);
}

// ---------------- ERROR HANDLING ----------------
import { errorHandler, notFound } from './middleware/error.middleware.js';

app.use(notFound);
app.use(errorHandler);

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});