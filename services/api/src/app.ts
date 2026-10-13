import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { healthRouter } from './modules/health/health.router';
import { destinationsRouter } from './modules/destinations/destinations.router';
import { matchingRouter } from './modules/matching/matching.router';
import { tripsRouter } from './modules/trips/trips.router';
import { mediaRouter } from './modules/media/media.router';
import { safetyRouter } from './modules/safety/safety.router';
import { errorHandler } from './middleware/errorHandler';

export const createApp = () => {
  const app = express();

  // OWASP Security headers
  app.use(helmet());

  // CORS configuration
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    })
  );

  // Body parser with 10MB limit
  app.use(express.json({ limit: '10mb' }));

  // API Versioning Prefix
  const apiRouter = express.Router();

  apiRouter.use('/health', healthRouter);
  apiRouter.use('/destinations', destinationsRouter);
  apiRouter.use('/matches', matchingRouter);
  apiRouter.use('/travel-plans', tripsRouter);
  apiRouter.use('/media', mediaRouter);
  apiRouter.use('/safety', safetyRouter);

  // Mount at /api/v1
  app.use('/api/v1', apiRouter);

  // Root fallback
  app.get('/', (req, res) => {
    res.json({
      name: 'M.A.T.E. API',
      description: 'Meeting Adventure Travel Escape REST Backend',
      version: '1.0.0',
      documentation: '/api/v1/health'
    });
  });

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
};
