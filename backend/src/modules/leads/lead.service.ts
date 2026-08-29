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

  lead.status = status as any;
  await lead.save();

  return lead;
}

export async function deleteLead(id: string) {
  return Lead.findByIdAndDelete(id);
}
