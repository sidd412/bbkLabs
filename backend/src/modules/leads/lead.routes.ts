import { Router } from 'express';
import * as leadController from './lead.controller.js';
import { validate } from '../../middleware/validate.js';
import { createLeadSchema } from './lead.validation.js';
import { formLimiter } from '../../middleware/rateLimiter.js';

const router = Router();

// Public — form submission
router.post('/', formLimiter, validate(createLeadSchema), leadController.create);

// Admin routes (to be protected later)
router.get('/', leadController.getAll);
router.get('/:id', leadController.getById);
router.patch('/:id/status', leadController.updateStatus);

export default router;
