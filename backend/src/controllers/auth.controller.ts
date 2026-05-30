import { Request, Response } from 'express';
import { Role } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { env } from '../config/env';

// Validation schemas
const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['EMPLOYEE', 'RECRUITER']).default('EMPLOYEE'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

function signAccessToken(userId: string, role: Role): string {
  return jwt.sign({ id: userId, role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN as any });
}

function signRefreshToken(userId: string): string {
  return jwt.sign({ id: userId, type: 'refresh' }, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN as any });
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const { email, password, role, firstName, lastName } = parsed.data;

    // Block ADMIN role from API signup
    if (role !== 'EMPLOYEE' && role !== 'RECRUITER') {
      res.status(403).json({ error: 'Invalid role' });
      return;
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ error: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, passwordHash, role: role as Role },
    });

    // Create profile based on role
    if (role === 'EMPLOYEE') {
      await prisma.employee.create({
        data: { userId: user.id, firstName, lastName },
      });
    }
    // Recruiter profile requires a company — created separately

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    res.status(201).json({
      message: 'Account created successfully',
      token: accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role, firstName, lastName },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Fetch profile name
    let firstName = 'User';
    let lastName = '';
    if (user.role === 'EMPLOYEE') {
      const emp = await prisma.employee.findUnique({ where: { userId: user.id } });
      if (emp) { firstName = emp.firstName; lastName = emp.lastName; }
    } else if (user.role === 'RECRUITER') {
      const rec = await prisma.recruiter.findUnique({ where: { userId: user.id } });
      if (rec) { firstName = rec.firstName; lastName = rec.lastName; }
    } else if (user.role === 'ADMIN') {
      const admin = await prisma.admin.findUnique({ where: { userId: user.id } });
      if (admin) { firstName = admin.firstName; lastName = admin.lastName; }
    }

    const accessToken = signAccessToken(user.id, user.role);
    const refreshToken = signRefreshToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      token: accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role, firstName, lastName },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) {
      res.status(400).json({ error: 'Refresh token is required' });
      return;
    }

    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as { id: string; type: string };
    if (decoded.type !== 'refresh') {
      res.status(401).json({ error: 'Invalid token type' });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user || !user.isActive) {
      res.status(401).json({ error: 'User not found or inactive' });
      return;
    }

    const newAccessToken = signAccessToken(user.id, user.role);
    res.status(200).json({ token: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired refresh token' });
  }
};
