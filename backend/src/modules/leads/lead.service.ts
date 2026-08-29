import { Lead } from './lead.model.js';
import { CreateLeadInput } from './lead.validation.js';

export async function createLead(data: CreateLeadInput) {
  const lead = new Lead(data);
  return lead.save();
}

export async function getLeads(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  const [leads, total] = await Promise.all([
    Lead.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Lead.countDocuments(),
  ]);
  return { leads, total, page, totalPages: Math.ceil(total / limit) };
}

export async function getLeadById(id: string) {
  return Lead.findById(id);
}

export async function updateLeadStatus(id: string, status: string) {
  const lead = await Lead.findById(id);
  if (!lead) return null;

  const oldStatus = lead.status;
  lead.status = status as any;
  await lead.save();

  if (status === 'converted' && oldStatus !== 'converted') {
    const { Project } = await import('../projects/project.model.js');
    const clientName = lead.businessName || lead.name;
    const title = `${lead.serviceNeeded.replace(/-/g, ' ')} for ${clientName}`;
    
    const project = new Project({
      title: title.charAt(0).toUpperCase() + title.slice(1),
      client: clientName,
      status: 'started',
      totalRevenue: 0,
      advancePaid: 0,
      services: [lead.serviceNeeded],
      notes: `Automatically created from lead conversion.\nContact: ${lead.phone} | ${lead.email || ''}\nRequirement: ${lead.requirement || 'N/A'}`,
    });
    
    await project.save().catch(console.error);
  }

  return lead;
}
