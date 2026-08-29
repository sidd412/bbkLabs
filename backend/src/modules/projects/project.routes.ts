import { Router, Request, Response } from 'express';
import { Project } from './project.model.js';
import { requireAuth } from '../../middleware/auth.js';
import { z } from 'zod';

const router = Router();

// Protect all project routes
router.use(requireAuth);

const projectSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  status: z.enum(['started', 'ongoing', 'completed', 'on-hold']).optional(),
  totalRevenue: z.number().min(0),
  advancePaid: z.number().min(0),
  services: z.array(z.string()),
  startDate: z.string().optional(),
  deadline: z.string().optional(),
  maintenanceRenewalDate: z.string().optional(),
  notes: z.string().optional(),
});

// GET all projects
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// POST new project
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = projectSchema.parse(req.body);
    const project = new Project(validatedData);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// GET dashboard stats (Projects specific)
router.get('/stats', async (_req: Request, res: Response): Promise<void> => {
  try {
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: { $in: ['started', 'ongoing'] } });
    
    const revenueData = await Project.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
          totalCollected: { $sum: '$advancePaid' },
        }
      }
    ]);

    const stats = revenueData[0] || { totalRevenue: 0, totalCollected: 0 };

    res.json({
      totalProjects,
      activeProjects,
      totalRevenue: stats.totalRevenue,
      pendingRevenue: stats.totalRevenue - stats.totalCollected,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// GET single project
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// PUT update project
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = projectSchema.parse(req.body);
    const project = await Project.findByIdAndUpdate(req.params.id, validatedData, { new: true });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE project
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json({ success: true, message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
