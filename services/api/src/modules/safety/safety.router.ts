import { Router, Request, Response } from 'express';

export interface SafetyReport {
  id: string;
  targetType: 'USER' | 'POST' | 'TRIP' | 'MESSAGE';
  targetId: string;
  reason: string;
  details?: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'INVESTIGATING' | 'ACTION_TAKEN' | 'DISMISSED';
}

const IN_MEMORY_REPORTS: SafetyReport[] = [];

export const safetyRouter = Router();

safetyRouter.post('/reports', (req: Request, res: Response) => {
  const { targetType, targetId, reason, details } = req.body || {};

  if (!targetType || !targetId || !reason) {
    res.status(400).json({
      status: 'error',
      message: 'targetType, targetId, and reason are required'
    });
    return;
  }

  const newReport: SafetyReport = {
    id: `rep-${Date.now()}`,
    targetType,
    targetId,
    reason,
    details,
    submittedAt: new Date().toISOString(),
    status: 'PENDING_REVIEW'
  };

  IN_MEMORY_REPORTS.push(newReport);

  res.status(201).json({
    status: 'success',
    message: 'Report submitted successfully and routed to trust & safety queue',
    reportId: newReport.id
  });
});

safetyRouter.get('/reports', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    total: IN_MEMORY_REPORTS.length,
    data: IN_MEMORY_REPORTS
  });
});
