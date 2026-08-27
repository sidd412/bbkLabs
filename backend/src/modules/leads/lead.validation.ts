import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  businessName: z.string().max(200).optional(),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  businessType: z.string().max(100).optional(),
  serviceNeeded: z.enum([
    'website',
    'software',
    'mobile-app',
    'ai-automation',
    'seo-digital-growth',
    'business-automation',
    'not-sure',
    'other',
  ]),
  requirement: z.string().max(2000).optional(),
  source: z.string().max(50).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
