import request from 'supertest';
import express from 'express';
import healthRoutes from '../routes/health.routes.js';

const app = express();
app.use('/api/health', healthRoutes);

describe('Health Check API', () => {
  it('should return 200 OK and status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
