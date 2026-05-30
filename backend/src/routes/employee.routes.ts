import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { getProfile, updateProfile, getSkills, getExperiences } from '../controllers/employee.controller';

const router = Router();

// All employee routes require authentication
router.use(authenticate);
router.use(authorize('EMPLOYEE'));

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/skills', getSkills);
router.get('/experiences', getExperiences);

export default router;
