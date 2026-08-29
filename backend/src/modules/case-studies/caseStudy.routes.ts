import { Router } from 'express';
import { CaseStudy } from './caseStudy.model.js';
import { requireAuth, requireAdmin } from '../../middleware/auth.js';

const router = Router();

// Public — get published case studies
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    const filter = req.query.all === 'true' ? {} : { published: true };
    const [caseStudies, total] = await Promise.all([
      CaseStudy.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      CaseStudy.countDocuments(filter),
    ]);
    res.json({ success: true, data: { caseStudies, total, page, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

// Public — get single by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findOne({ slug: req.params.slug, published: true });
    if (!caseStudy) {
      res.status(404).json({ success: false, error: 'Case study not found' });
      return;
    }
    res.json({ success: true, data: caseStudy });
  } catch (error) {
    next(error);
  }
});

// Admin — create
router.post('/', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const caseStudy = new CaseStudy(req.body);
    await caseStudy.save();
    res.status(201).json({ success: true, data: caseStudy });
  } catch (error) {
    next(error);
  }
});

// Admin — update
router.put('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!caseStudy) {
      res.status(404).json({ success: false, error: 'Case study not found' });
      return;
    }
    res.json({ success: true, data: caseStudy });
  } catch (error) {
    next(error);
  }
});

// Admin — delete
router.delete('/:id', requireAuth, requireAdmin, async (req, res, next) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Case study deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
