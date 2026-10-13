import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from './app';

const app = createApp();

describe('M.A.T.E. API Core Endpoints', () => {
  it('GET /api/v1/health should return ok status and metadata', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toBe('mate-api');
  });

  it('GET /api/v1/destinations should return canonical destinations list', async () => {
    const res = await request(app).get('/api/v1/destinations');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/destinations with category filter should filter properly', async () => {
    const res = await request(app).get('/api/v1/destinations?category=Mountains');
    expect(res.status).toBe(200);
    expect(res.body.data.every((d: { category: string }) => d.category === 'Mountains')).toBe(true);
  });

  it('POST /api/v1/matches/search should return explainable compatibility matches', async () => {
    const res = await request(app)
      .post('/api/v1/matches/search')
      .send({ destination_id: 'dest-manali', budget_tier: 'Budget' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].compatibilityFactors.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/travel-plans/:id/room should return private Trip Room details', async () => {
    const res = await request(app).get('/api/v1/travel-plans/plan-manali-snow/room');
    expect(res.status).toBe(200);
    expect(res.body.data.planId).toBe('plan-manali-snow');
    expect(res.body.data.itinerary.length).toBeGreaterThan(0);
    expect(res.body.data.safetyGuidelines.length).toBeGreaterThan(0);
  });

  it('POST /api/v1/media/similarity/check should detect exact duplicate SHA256', async () => {
    const res = await request(app)
      .post('/api/v1/media/similarity/check')
      .send({ sampleTextOrHex: 'sample-image-data', mode: 'exact' });
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body.computedSha256).toBeDefined();
  });

  it('POST /api/v1/safety/reports should accept a report and return 201', async () => {
    const res = await request(app)
      .post('/api/v1/safety/reports')
      .send({
        targetType: 'USER',
        targetId: 'user-suspicious-1',
        reason: 'Impersonation or suspicious profile'
      });
    expect(res.status).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.reportId).toBeDefined();
  });

  it('POST /api/v1/safety/reports should reject invalid requests with 400', async () => {
    const res = await request(app)
      .post('/api/v1/safety/reports')
      .send({});
    expect(res.status).toBe(400);
  });
});
