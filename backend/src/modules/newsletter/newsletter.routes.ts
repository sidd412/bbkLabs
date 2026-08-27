import { Router } from 'express';
import { z } from 'zod';
import { Subscriber } from './subscriber.model.js';
import { validate } from '../../middleware/validate.js';
import { formLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

router.post('/subscribe', formLimiter, validate(subscribeSchema), async (req, res, next) => {
  try {
    const existing = await Subscriber.findOne({ email: req.body.email });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
      }
      res.json({ success: true, message: 'You are subscribed!' });
      return;
    }
    const subscriber = new Subscriber({ email: req.body.email });
    await subscriber.save();
    res.status(201).json({ success: true, message: 'Successfully subscribed!' });
  } catch (error) {
    next(error);
  }
});

export default router;
