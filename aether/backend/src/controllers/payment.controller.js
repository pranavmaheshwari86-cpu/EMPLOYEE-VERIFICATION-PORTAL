import Subscription from '../models/Subscription.js';
import {
  createCustomer,
  createCheckoutSession,
  createPortalSession,
  handleWebhookEvent,
} from '../services/payment.service.js';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'your_stripe_secret_key') {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn("Could not initialize Stripe in controller:", error.message);
  }
}

// @desc    Create a checkout session for plan upgrade
// @route   POST /api/payments/create-checkout
// @access  Employer
export const createCheckout = async (req, res) => {
  try {
    const { plan } = req.body;

    if (!['pro', 'enterprise'].includes(plan)) {
      return res.status(400).json({ message: 'Invalid plan. Choose pro or enterprise.' });
    }

    // Find or create subscription record
    let subscription = await Subscription.findOne({ user: req.user._id });

    let customerId;
    if (subscription?.stripeCustomerId) {
      customerId = subscription.stripeCustomerId;
    } else {
      const customer = await createCustomer(req.user.email, req.user.name);
      customerId = customer.id;

      if (!subscription) {
        subscription = await Subscription.create({
          user: req.user._id,
          stripeCustomerId: customerId,
        });
      } else {
        subscription.stripeCustomerId = customerId;
        await subscription.save();
      }
    }

    const session = await createCheckoutSession(customerId, plan, String(req.user._id));

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Create Checkout Error:', error.message);
    res.status(500).json({ message: 'Failed to create checkout session', error: error.message });
  }
};

// @desc    Stripe webhook handler
// @route   POST /api/payments/webhook
// @access  Public (Stripe)
export const webhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    if (!stripe) {
      return res.status(400).json({ message: 'Stripe is not configured on this server.' });
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    await handleWebhookEvent(event);
    res.json({ received: true });
  } catch (error) {
    console.error('Webhook Error:', error.message);
    res.status(400).json({ message: `Webhook Error: ${error.message}` });
  }
};

// @desc    Get billing info
// @route   GET /api/payments/billing
// @access  Protected
export const getBilling = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });

    if (!subscription) {
      return res.json({
        plan: 'free',
        status: 'active',
        features: {
          aiAnalysisPerMonth: 5,
          jobPostsPerMonth: 2,
          candidateRanking: false,
          fraudDetection: false,
          prioritySupport: false,
        },
        usage: { aiAnalysisUsed: 0, jobPostsUsed: 0 },
        billingHistory: [],
      });
    }

    res.json(subscription);
  } catch (error) {
    console.error('Get Billing Error:', error.message);
    res.status(500).json({ message: 'Failed to fetch billing info' });
  }
};

// @desc    Create billing portal session
// @route   POST /api/payments/portal
// @access  Protected
export const billingPortal = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });

    if (!subscription?.stripeCustomerId) {
      return res.status(400).json({ message: 'No billing account found. Subscribe to a plan first.' });
    }

    const session = await createPortalSession(subscription.stripeCustomerId);
    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error('Portal Error:', error.message);
    res.status(500).json({ message: 'Failed to create portal session' });
  }
};
