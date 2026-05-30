import { Router } from 'express';
import { getCandidateMatches } from '../controllers/match.controller';

const router = Router();

router.get('/candidates', getCandidateMatches);

export default router;
