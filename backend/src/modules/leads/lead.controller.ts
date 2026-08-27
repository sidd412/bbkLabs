import { Request, Response, NextFunction } from 'express';
import * as leadService from './lead.service.js';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await leadService.createLead(req.body);
    res.status(201).json({
      success: true,
      message: 'Thank you! We will get back to you shortly.',
      data: { id: lead._id },
    });
  } catch (error) {
    next(error);
  }
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await leadService.getLeads(page, limit);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await leadService.getLeadById(req.params.id as string);
    if (!lead) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}

export async function updateStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await leadService.updateLeadStatus(req.params.id as string, req.body.status);
    if (!lead) {
      res.status(404).json({ success: false, error: 'Lead not found' });
      return;
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
}
