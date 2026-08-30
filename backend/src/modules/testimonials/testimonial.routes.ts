import { Router, Request, Response } from 'express';
import { Testimonial } from './testimonial.model.js';
import { requireAuth } from '../../middleware/auth.js';
import { z } from 'zod';

const router = Router();

const testimonialSchema = z.object({
  clientName: z.string().min(1),
  company: z.string().min(1),
  message: z.string().min(1),
  rating: z.number().min(1).max(5),
  isActive: z.boolean().optional()
});

// GET all testimonials (Public, but maybe we want to show only active ones to frontend)
// Using a query param `?all=true` for CMS
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { all } = req.query;
    const filter = all === 'true' ? {} : { isActive: true };
    const testimonials = await Testimonial.find(filter).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// CREATE testimonial (Protected)
router.post('/', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = testimonialSchema.parse(req.body);
    const testimonial = new Testimonial(validatedData);
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
});

// UPDATE testimonial (Protected)
router.put('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = testimonialSchema.parse(req.body);
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    
    res.json(testimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
});

// DELETE testimonial (Protected)
router.delete('/:id', requireAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!testimonial) {
      res.status(404).json({ error: 'Testimonial not found' });
      return;
    }
    
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export const testimonialRoutes = router;
