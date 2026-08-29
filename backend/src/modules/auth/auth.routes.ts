import { Router } from 'express';
import { login, setupInitialAdmin } from './auth.controller.js';

const router = Router();

router.post('/login', login);
router.post('/setup-admin', setupInitialAdmin);

export default router;
