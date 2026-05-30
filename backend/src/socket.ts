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

  // Basic Redis setup for pub/sub if Redis URL is provided
  if (process.env.REDIS_URL) {
    const pubClient = new Redis(process.env.REDIS_URL);
    const subClient = pubClient.duplicate();
    io.adapter(createAdapter(pubClient, subClient));
    console.log('Redis adapter connected to Socket.io');
  } else {
    console.warn('REDIS_URL not provided, Socket.io will not use Redis adapter');
  }

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Real-time messaging
    socket.on('sendMessage', (data) => {
      console.log('Message received:', data);
      // Broadcast to room or user
      // io.to(data.roomId).emit('newMessage', data);
    });

    // Real-time notifications
    socket.on('subscribeNotifications', (userId) => {
      socket.join(`notifications_${userId}`);
      console.log(`User ${userId} subscribed to notifications`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
