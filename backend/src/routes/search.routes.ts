import { Router } from 'express';
import { getJobRecommendations } from '../controllers/search.controller';

const router = Router();

router.get('/jobs', getJobRecommendations);

export default router;
