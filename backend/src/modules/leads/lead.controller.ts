import { Request, Response, NextFunction } from 'express';
import * as leadService from './lead.service.js';
import { emailService } from '../../utils/email.js';
import { whatsappService } from '../../utils/whatsapp.js';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const lead = await leadService.createLead(req.body);
    
    // Trigger alerts asynchronously
    Promise.all([
      emailService.sendAdminAlert(req.body),
      emailService.sendClientWelcome(req.body.email, req.body.name),
      whatsappService.sendAdminAlert(req.body.name, req.body.serviceNeeded, req.body.phone),
      whatsappService.sendClientWelcome(req.body.phone, req.body.name)
    ]).catch(err => console.error('Alerts failed:', err));

    res.status(201).json({
      success: true,
      message: 'Thank you! We will get back to you shortly.',
      data: { id: lead._id },
    });
  } catch (error) {
    next(error);
  }
}

export async function createBatch(req: Request, res: Response, next: NextFunction) {
  try {
    if (!Array.isArray(req.body.leads)) {
      res.status(400).json({ success: false, error: 'Expected leads array' });
      return;
    }
    const created = await Promise.all(req.body.leads.map((l: any) => leadService.createLead(l)));
    res.status(201).json({ success: true, count: created.length });
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

export async function deleteLead(req: Request, res: Response, next: NextFunction) {
  try {
    await leadService.deleteLead(req.params.id as string);
    res.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    next(error);
  }
}
