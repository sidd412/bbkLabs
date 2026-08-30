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

export async function sendOutreach(req: Request, res: Response, next: NextFunction) {
  try {
    const { subject, message, leadIds } = req.body;
    
    if (!subject || !message || !Array.isArray(leadIds) || leadIds.length === 0) {
      res.status(400).json({ success: false, error: 'Missing subject, message, or leadIds' });
      return;
    }

    // Fetch leads to get their emails
    const leads = await leadService.getLeads(1, 10000); // Fetch a large number to ensure we get them all
    const validLeads = leads.leads.filter(l => leadIds.includes(l._id.toString()) && !!l.email);
    const emails = validLeads.map(l => l.email!);

    if (emails.length === 0) {
      res.status(400).json({ success: false, error: 'No valid emails found for selected leads' });
      return;
    }

    // Wrap the message in a professional template
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px;">
        ${message.replace(/\n/g, '<br/>')}
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p>Best Regards,</p>
        <p style="margin-bottom: 5px;"><strong>Team BBK Labs</strong></p>
        <p style="margin-top: 0; color: #64748b; font-size: 14px;"><em>(Building your business via tech)</em></p>
        <p style="margin-top: 15px; font-size: 12px; color: #9ca3af;">You are receiving this email because you previously inquired about our services.</p>
      </div>
    `;

    // Trigger bulk sending asynchronously so we don't block the response
    emailService.sendBulkOutreach(emails, subject, htmlContent).catch(err => console.error('Bulk outreach failed:', err));

    res.json({ 
      success: true, 
      message: `Outreach triggered for ${emails.length} leads. Emails are being sent in the background.`,
      targetCount: emails.length
    });
  } catch (error) {
    next(error);
  }
}
