import { Router } from 'express';
import { Contact } from './contact.model.js';
import { validate } from '../../middleware/validate.js';
import { createContactSchema } from './contact.validation.js';
import { formLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

router.post('/', formLimiter, validate(createContactSchema), async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! We will respond shortly.',
    });
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const [contacts, total] = await Promise.all([
      Contact.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Contact.countDocuments(),
    ]);
    res.json({ success: true, data: { contacts, total, page, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

export default router;
