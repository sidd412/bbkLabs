import { Router } from 'express';
import { BlogPost } from './post.model.js';

const router = Router();

// Public — list published posts
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    const filter = req.query.all === 'true' ? {} : { published: true };
    if (req.query.category) {
      Object.assign(filter, { category: req.query.category });
    }
    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .select('-content')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(filter),
    ]);
    res.json({ success: true, data: { posts, total, page, totalPages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

// Public — get single post by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// Admin — create
router.post('/', async (req, res, next) => {
  try {
    const post = new BlogPost(req.body);
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// Admin — update
router.put('/:id', async (req, res, next) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      res.status(404).json({ success: false, error: 'Post not found' });
      return;
    }
    res.json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
});

// Admin — delete
router.delete('/:id', async (req, res, next) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Post deleted' });
  } catch (error) {
    next(error);
  }
});

export default router;
