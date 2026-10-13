import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const isProduction = process.env.NODE_ENV === 'production';

  // Structured safe error log (without exposing secrets)
  console.error(`[ERROR] ${req.method} ${req.url} - ${statusCode}: ${err.message}`);

  res.status(statusCode).json({
    status: 'error',
    code: err.code || 'INTERNAL_ERROR',
    message: statusCode === 500 && isProduction ? 'An unexpected server error occurred' : err.message,
    details: err.details || undefined,
    timestamp: new Date().toISOString()
  });
};
