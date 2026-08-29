import { Request, Response } from 'express';
import { User } from './auth.model.js';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await User.findOne({ email });
    if (!user || !user.active) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      env.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Temp function to create initial admin. In production, this should be removed or highly secured.
export const setupInitialAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      res.status(400).json({ error: 'Admin already exists' });
      return;
    }

    const user = new User({
      name: 'Admin',
      email: 'admin@bbklabs.com',
      passwordHash: 'bbkadmin123!', // You should change this immediately after logging in
      role: 'admin',
    });

    await user.save();
    res.status(201).json({ message: 'Initial admin created. Please login and change the password.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to setup admin' });
  }
};
