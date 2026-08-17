import { Server as SocketIOServer } from 'socket.io';
import { Server as HttpServer } from 'http';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';

import { env } from './config/env';

export const setupWebSocket = (httpServer: HttpServer) => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.FRONTEND_URL,
      credentials: true,
    },
  });

  // Redis setup for pub/sub if Redis URL is provided
  if (process.env.REDIS_URL) {
    try {
      const pubClient = new Redis(process.env.REDIS_URL, { lazyConnect: true });
      const subClient = pubClient.duplicate();
      
      pubClient.on('error', (err) => console.error('Socket.io Redis Pub Error:', err.message));
      subClient.on('error', (err) => console.error('Socket.io Redis Sub Error:', err.message));
      
      Promise.all([pubClient.connect(), subClient.connect()])
        .then(() => {
          io.adapter(createAdapter(pubClient, subClient));
          console.log('Redis adapter connected to Socket.io');
        })
        .catch((err) => {
          console.warn('Socket.io Redis connection deferred:', err.message);
        });
    } catch (e) {
      console.warn('Failed to initialize Socket.io Redis adapter:', e);
    }
  } else {
    console.warn('REDIS_URL not provided, Socket.io using single-instance fallback');
  }

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Real-time messaging
    socket.on('sendMessage', (data) => {
      if (data?.roomId) {
        socket.to(data.roomId).emit('newMessage', data);
      }
    });

    // Real-time notifications
    socket.on('subscribeNotifications', (userId) => {
      if (userId) {
        socket.join(`notifications_${userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

