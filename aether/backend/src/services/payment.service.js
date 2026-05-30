import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import dotenv from 'dotenv';

dotenv.config();

let stripe = null;
if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== 'your_stripe_secret_key') {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  } catch (error) {
    console.warn("Could not initialize Stripe:", error.message);
  }
} else {
  console.warn("STRIPE_SECRET_KEY is not set or is a placeholder. Payments will not work.");
}

const PLAN_CONFIG = {
  pro: {
    priceId: process.env.STRIPE_PRICE_PRO,
    features: {
      aiAnalysisPerMonth: 50,
      jobPostsPerMonth: 20,
      candidateRanking: true,
      fraudDetection: false,
      prioritySupport: false,
    },
  },
  enterprise: {
    priceId: process.env.STRIPE_PRICE_ENTERPRISE,
    features: {
      aiAnalysisPerMonth: 999,
      jobPostsPerMonth: 999,
      candidateRanking: true,
      fraudDetection: true,
      prioritySupport: true,
    },
  },
};

/**
 * Create a Stripe customer
 */
export const createCustomer = async (email, name) => {
  try {
    if (!stripe) return { id: 'dummy_customer_id' };
    const customer = await stripe.customers.create({ email, name });
    return customer;
  } catch (error) {
    console.error('Stripe createCustomer error:', error.message);
    throw error;
  }
};

/**
 * Create a Stripe Checkout session
 */
export const createCheckoutSession = async (customerId, plan, userId) => {
  try {
    if (!stripe) return { id: 'dummy_session_id', url: `${process.env.FRONTEND_URL}/employer/dashboard` };
    const config = PLAN_CONFIG[plan];
    if (!config) throw new Error(`Invalid plan: ${plan}`);

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [{ price: config.priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/employer/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/employer/dashboard?cancelled=true`,
      metadata: { userId, plan },
    });

    return session;
  } catch (error) {
    console.error('Stripe createCheckoutSession error:', error.message);
    throw error;
  }
};

/**
 * Create a Stripe billing portal session
 */
export const createPortalSession = async (customerId) => {
  try {
    if (!stripe) return { url: 'http://localhost:5173/dashboard' };
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.FRONTEND_URL}/employer/dashboard`,
    });
    return session;
  } catch (error) {
    console.error('Stripe createPortalSession error:', error.message);
    throw error;
  }
};

/**
 * Get subscription status from Stripe
 */
export const getSubscriptionStatus = async (subscriptionId) => {
  try {
    if (!stripe) return { status: 'active', current_period_end: Date.now() / 1000 + 31536000 };
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Stripe getSubscriptionStatus error:', error.message);
    throw error;
  }
};

/**
 * Handle Stripe webhook events
 */
export const handleWebhookEvent = async (event) => {
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const { userId, plan } = session.metadata;
        const config = PLAN_CONFIG[plan];

        await Subscription.findOneAndUpdate(
          { user: userId },
          {
            user: userId,
            plan,
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            status: 'active',
            features: config?.features || {},
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          },
          { upsert: true, new: true }
        );
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object;
        const sub = await Subscription.findOne({ stripeCustomerId: invoice.customer });
        if (sub) {
          sub.billingHistory.push({
            amount: invoice.amount_paid / 100,
            currency: invoice.currency,
            description: `Invoice ${invoice.number}`,
            invoiceUrl: invoice.hosted_invoice_url,
            paidAt: new Date(invoice.status_transitions.paid_at * 1000),
          });
          // Reset monthly usage
          sub.usage.aiAnalysisUsed = 0;
          sub.usage.jobPostsUsed = 0;
          sub.usage.lastResetDate = new Date();
          await sub.save();
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          }
        );
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await Subscription.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          {
            status: 'cancelled',
            plan: 'free',
            features: {
              aiAnalysisPerMonth: 5,
              jobPostsPerMonth: 2,
              candidateRanking: false,
              fraudDetection: false,
              prioritySupport: false,
            },
          }
        );
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event.type}`);
    }
  } catch (error) {
    console.error('Webhook handler error:', error.message);
    throw error;
  }
};
