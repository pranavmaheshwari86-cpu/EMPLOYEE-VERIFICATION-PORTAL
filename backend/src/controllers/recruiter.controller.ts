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
      console.warn('DB error in recruiter getProfile:', dbErr);
    }

    if (!recruiter) {
      res.status(404).json({ error: 'Recruiter profile not found', profileExists: false });
      return;
    }

    res.status(200).json(recruiter);
  } catch (error) {
    console.error('getProfile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) { res.status(401).json({ error: 'Not authenticated' }); return; }

    const existing = await prisma.recruiter.findUnique({ where: { userId: req.user.dbId } }).catch(() => null);
    if (existing) {
      res.status(400).json({ error: 'Recruiter profile already exists', profileExists: true, profile: existing });
      return;
    }

    const { firstName, lastName, companyName, website, industry } = req.body;

    let company = companyName ? await prisma.company.findFirst({ where: { name: companyName } }).catch(() => null) : null;
    if (!company) {
      company = await prisma.company.create({
        data: {
          name: companyName || 'Independent',
          website: website || '',
          industry: industry || 'Technology',
          slug: (companyName || 'Independent').toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now()
        }
      });
    }

    const newRecruiter = await prisma.recruiter.create({
      data: {
        userId: req.user.dbId,
        firstName: firstName || 'New',
        lastName: lastName || 'Recruiter',
        companyId: company.id,
      },
      include: { company: true }
    });

    res.status(201).json(newRecruiter);
  } catch (error) {
    console.error('createProfile error:', error);
    res.status(500).json({ error: 'Failed to create recruiter profile' });
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
