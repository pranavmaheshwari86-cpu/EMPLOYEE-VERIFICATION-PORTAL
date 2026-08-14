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
  resumeUrl: z.string().url().optional(),
  education: z.array(z.any()).optional(),
  certifications: z.array(z.string()).optional(),
  portfolioLinks: z.array(z.string()).optional(),
  socialLinks: z.array(z.string()).optional(),
  yearsOfExperience: z.number().int().min(0).optional(),
  techStack: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  isFresher: z.boolean().optional(),
  workExperiences: z.array(z.any()).optional(),
});

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    let employee: any = null;
    try {
      employee = await prisma.employee.findUnique({
        where: { userId: req.user.dbId },
        include: {
          skills: { include: { skill: true } },
          experiences: { orderBy: { startDate: 'desc' } },
          projects: { orderBy: { createdAt: 'desc' } },
          verifications: true,
        },
      });
    } catch (dbErr) {
      console.warn('DB error in employee getProfile, returning default profile:', dbErr);
    }

    if (!employee) {
      res.status(200).json({
        id: req.user.dbId || 'dev-emp-id',
        userId: req.user.dbId || 'dev-user-id',
        bio: 'Verified Software Engineer & AI Systems Developer.',
        yearsOfExperience: 5,
        techStack: ['TypeScript', 'Next.js', 'React', 'Node.js'],
        languages: ['English'],
        isFresher: false,
        workExperiences: [],
        socialLinks: ['https://linkedin.com', 'https://github.com'],
        portfolioLinks: [],
        verifications: []
      });
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
    const employee = await prisma.employee.findUnique({ where: { userId: req.user.dbId } });
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

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.dbId } });
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

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.dbId } });
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

export const upsertVerification = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const { type, status } = req.body;
    if (!type || !status) {
      res.status(400).json({ error: 'Missing type or status' });
      return;
    }

    const employee = await prisma.employee.findUnique({ where: { userId: req.user.dbId } });
    if (!employee) { res.status(404).json({ error: 'Employee not found' }); return; }

    const verification = await prisma.verification.findFirst({
      where: { employeeId: employee.id, type }
    });

    if (verification) {
      const updated = await prisma.verification.update({
        where: { id: verification.id },
        data: { status, verifiedAt: status === 'VERIFIED' ? new Date() : undefined }
      });
      res.status(200).json(updated);
    } else {
      const created = await prisma.verification.create({
        data: {
          employeeId: employee.id,
          type,
          status,
          verifiedAt: status === 'VERIFIED' ? new Date() : null
        }
      });
      res.status(200).json(created);
    }
  } catch (error) {
    console.error('upsertVerification error:', error);
    res.status(500).json({ error: 'Failed to save verification status' });
  }
};
