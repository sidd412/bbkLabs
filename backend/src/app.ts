import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

// Route imports
import leadRoutes from './modules/leads/lead.routes.js';
import contactRoutes from './modules/contacts/contact.routes.js';
import caseStudyRoutes from './modules/case-studies/caseStudy.routes.js';
import blogRoutes from './modules/blog/post.routes.js';
import newsletterRoutes from './modules/newsletter/newsletter.routes.js';

const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: env.corsOrigin, credentials: true }));
app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
