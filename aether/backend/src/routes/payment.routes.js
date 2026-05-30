import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { createCheckout, webhook, getBilling, billingPortal } from '../controllers/payment.controller.js';

const router = express.Router();

// Webhook must come BEFORE json body parser — uses raw body
router.post('/webhook', express.raw({ type: 'application/json' }), webhook);

router.post('/create-checkout', protect, authorize('employer'), createCheckout);
router.get('/billing', protect, getBilling);
router.post('/portal', protect, billingPortal);

export default router;
