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
import authRoutes from './modules/auth/auth.routes.js';
import projectRoutes from './modules/projects/project.routes.js';
import { testimonialRoutes } from './modules/testimonials/testimonial.routes.js';

const app = express();

// Security
app.use(helmet());
const allowedOrigins = env.corsOrigin.split(',').map(o => o.trim());
app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }, 
  credentials: true 
}));
app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/testimonials', testimonialRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
