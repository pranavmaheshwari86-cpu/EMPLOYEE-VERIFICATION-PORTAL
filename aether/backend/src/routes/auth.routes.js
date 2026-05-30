import express from 'express';
import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  verifyEmail,
  getDevToken,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verify-email/:token', verifyEmail);
router.get('/dev-token', protect, getDevToken);
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

export default router;
