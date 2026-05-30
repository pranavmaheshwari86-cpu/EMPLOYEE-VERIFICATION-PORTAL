import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    plan: {
      type: String,
      enum: ['free', 'pro', 'enterprise'],
      default: 'free',
    },
    stripeCustomerId: { type: String },
    stripeSubscriptionId: { type: String },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'past_due', 'trialing'],
      default: 'active',
    },
    currentPeriodStart: Date,
    currentPeriodEnd: Date,
    features: {
      aiAnalysisPerMonth: { type: Number, default: 5 },
      jobPostsPerMonth: { type: Number, default: 2 },
      candidateRanking: { type: Boolean, default: false },
      fraudDetection: { type: Boolean, default: false },
      prioritySupport: { type: Boolean, default: false },
    },
    usage: {
      aiAnalysisUsed: { type: Number, default: 0 },
      jobPostsUsed: { type: Number, default: 0 },
      lastResetDate: { type: Date, default: Date.now },
    },
    billingHistory: [
      {
        amount: Number,
        currency: { type: String, default: 'usd' },
        description: String,
        invoiceUrl: String,
        paidAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
