import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(15).optional(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
