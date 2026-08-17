import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { getProfile, createProfile, updateProfile } from '../controllers/recruiter.controller';

const router = Router();

// All recruiter routes require authentication
router.use(authenticate);
router.use(authorize('RECRUITER'));

router.get('/profile', getProfile);
router.post('/profile', createProfile);
router.put('/profile', updateProfile);

export default router;
