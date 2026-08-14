import { Router } from 'express';
import prisma from '../lib/prisma';
import { authenticate } from '../middleware/auth.middleware';
import { validateRequest } from '../middleware/validate.middleware';
import { z } from 'zod';

const syncSchema = z.object({
  body: z.object({
    id: z.string(),
    email: z.string().email(),
    role: z.enum(['EMPLOYEE', 'RECRUITER', 'ADMIN']).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    companyName: z.string().optional(),
  })
});

const router = Router();

// Endpoint for frontend to sync newly registered users
router.post('/sync', validateRequest(syncSchema), async (req, res) => {
  try {
    const { id, email, role, firstName, lastName, companyName } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          supabaseId: id,
          email,
          role: role || 'EMPLOYEE',
          isActive: true
        }
      });
      
      // Create associated profile based on role
      if (role === 'EMPLOYEE') {
        await prisma.employee.create({
          data: {
            userId: user.id,
            firstName: firstName || 'New',
            lastName: lastName || 'User'
          }
        });
      } else if (role === 'RECRUITER') {
        // Find or create company
        let company = companyName ? await prisma.company.findFirst({ where: { name: companyName } }) : null;
        if (!company) {
          company = await prisma.company.create({
            data: { 
              name: companyName || 'Independent', 
              website: '', 
              industry: '',
              slug: (companyName || 'Independent').toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }
          });
        }
        await prisma.recruiter.create({
          data: {
            userId: user.id,
            firstName: firstName || 'New',
            lastName: lastName || 'User',
            companyId: company.id
          }
        });
      }
    } else {
      // Update supabaseId if missing
      if (!user.supabaseId) {
        user = await prisma.user.update({
          where: { email },
          data: { supabaseId: id }
        });
      }
    }

    res.json({ message: 'User synchronized successfully', user });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
