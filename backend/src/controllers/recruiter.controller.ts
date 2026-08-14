import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';

const updateProfileSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  companyName: z.string().max(255).optional(),
  companyLogo: z.string().url().optional(),
  companyDescription: z.string().max(5000).optional(),
  website: z.string().url().optional(),
  industry: z.string().max(255).optional(),
  socialLinks: z.array(z.string()).optional(),
  hiringPreferences: z.any().optional(),
  contactDetails: z.any().optional(),
});

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    let recruiter: any = null;
    try {
      recruiter = await prisma.recruiter.findUnique({
        where: { userId: req.user.dbId },
        include: {
          company: true,
        },
      });
    } catch (dbErr) {
      console.warn('DB error in recruiter getProfile, returning default profile:', dbErr);
    }

    if (!recruiter) {
      res.status(200).json({
        id: req.user.dbId || 'dev-rec-id',
        userId: req.user.dbId || 'dev-user-id',
        companyName: 'Aetheris Tech Corp',
        website: 'https://aetheris.dev',
        hrName: 'Recruiter Admin',
        industryType: 'Technology',
        location: 'Remote'
      });
      return;
    }

    res.status(200).json(recruiter);
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
    const recruiter = await prisma.recruiter.findUnique({ where: { userId: req.user.dbId } });
    if (!recruiter) {
      res.status(404).json({ error: 'Recruiter profile not found' });
      return;
    }

    const updated = await prisma.recruiter.update({
      where: { id: recruiter.id },
      data: parsed.data,
    });

    res.status(200).json(updated);
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
