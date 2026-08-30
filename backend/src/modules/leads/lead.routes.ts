import { Router } from 'express';
import * as leadController from './lead.controller.js';
import { validate } from '../../middleware/validate.js';
import { createLeadSchema } from './lead.validation.js';
import { formLimiter } from '../../middleware/rateLimiter.js';
import { emailService } from '../../utils/email.js';
import { whatsappService } from '../../utils/whatsapp.js';

const router = Router();

// Public — form submission
router.post('/', formLimiter, validate(createLeadSchema), leadController.create);

// Admin routes (to be protected later)
router.post('/batch', leadController.createBatch);
router.get('/', leadController.getAll);
router.get('/:id', leadController.getById);
router.patch('/:id/status', leadController.updateStatus);
router.delete('/:id', leadController.deleteLead);

export default router;
