import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  analyzeApplicationResume,
  generateInterview,
  fraudCheck,
  rankJobCandidates,
} from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/analyze-resume', protect, authorize('employer', 'admin'), analyzeApplicationResume);
router.post('/generate-interview/:applicationId', protect, authorize('employer', 'admin'), generateInterview);
router.post('/fraud-check/:applicationId', protect, authorize('admin'), fraudCheck);
router.get('/rank-candidates/:jobId', protect, authorize('employer', 'admin'), rankJobCandidates);

export default router;
