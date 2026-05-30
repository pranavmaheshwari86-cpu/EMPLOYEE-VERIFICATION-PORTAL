import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  headline: z.string().max(255).optional(),
  bio: z.string().max(5000).optional(),
  location: z.string().max(255).optional(),
  avatarUrl: z.string().url().optional(),
});

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const employee = await prisma.employee.findUnique({
      where: { userId: req.user.id },
      include: {
        skills: { include: { skill: true } },
        experiences: { orderBy: { startDate: 'desc' } },
        projects: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!employee) {
      res.status(404).json({ error: 'Employee profile not found' });
      return;
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const parsed = updateProfileSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0].message });
      return;
    }

    // Ownership check
    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) {
      res.status(404).json({ error: 'Employee profile not found' });
      return;
    }

    const updated = await prisma.employee.update({
      where: { id: employee.id },
      data: parsed.data,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) { res.status(404).json({ error: 'Profile not found' }); return; }

    const skills = await prisma.employeeSkill.findMany({
      where: { employeeId: employee.id },
      include: { skill: true },
    });

    res.status(200).json(skills);
  } catch (error) {
    console.error('getSkills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

export const getExperiences = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.id } });
    if (!employee) { res.status(404).json({ error: 'Profile not found' }); return; }

    const experiences = await prisma.experience.findMany({
      where: { employeeId: employee.id },
      orderBy: { startDate: 'desc' },
    });

    res.status(200).json(experiences);
  } catch (error) {
    console.error('getExperiences error:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
};
