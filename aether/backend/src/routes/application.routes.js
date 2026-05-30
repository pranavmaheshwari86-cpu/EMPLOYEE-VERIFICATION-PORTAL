import express from 'express';
import { applyForJob, getJobApplications } from '../controllers/application.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { upload } from '../services/upload.service.js';

const router = express.Router();

router.post('/:jobId', protect, authorize('employee'), upload.single('resume'), applyForJob);
router.get('/job/:jobId', protect, authorize('employer', 'admin'), getJobApplications);

export default router;
