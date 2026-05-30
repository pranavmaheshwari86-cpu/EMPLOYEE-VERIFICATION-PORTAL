import Redis from 'ioredis';
import logger from '../utils/logger.js';

const redisUrl = process.env.REDIS_URL;

let client = null;

if (!redisUrl || redisUrl === 'disabled') {
  logger.warn('Redis is disabled (running without cache)');
} else {
  try {
    client = new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      retryStrategy(times) {
        if (times > 10) {
          logger.error('Redis connection failed permanently after 10 retries');
          return null;
        }
        return Math.min(times * 50, 2000);
      },
    });

    client.on('connect', () => {
      logger.info('Redis connected successfully');
    });

    client.on('error', (err) => {
      logger.error(`Redis Error: ${err.message}`);
    });

  } catch (err) {
    logger.error('Redis initialization failed:', err.message);
    client = null;
  }
}

// 🔥 SAFE WRAPPER (prevents crashes)
export const redis = {
  async get(key) {
    if (!client) return null;
    return client.get(key);
  },
  async set(key, value, mode, duration) {
    if (!client) return null;
    return client.set(key, value, mode, duration);
  },
  async del(key) {
    if (!client) return null;
    return client.del(key);
  },
  async call(...args) {
    if (!client) return null;
    return client.call(...args);
  },
  raw() {
    return client;
  }
};