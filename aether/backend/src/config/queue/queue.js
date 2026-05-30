import { Queue } from 'bullmq';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { redis } from '../redis.js';

// Connection options for BullMQ
const connection = redis;

// Initialize Queues
export const aiQueue = new Queue('AI_Processing_Queue', { connection });
export const emailQueue = new Queue('Email_Notification_Queue', { connection });
export const fraudQueue = new Queue('Fraud_Detection_Queue', { connection });

// Initialize Bull Board for monitoring
export const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [
    new BullMQAdapter(aiQueue),
    new BullMQAdapter(emailQueue),
    new BullMQAdapter(fraudQueue),
  ],
  serverAdapter,
});
