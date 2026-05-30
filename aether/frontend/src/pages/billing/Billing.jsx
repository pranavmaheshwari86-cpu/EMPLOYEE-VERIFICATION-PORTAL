import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { useCreateCheckout, useBilling, useCreatePortalSession } from '../../hooks/usePayments';
import { Check, Loader2, Sparkles, Zap, Shield } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Billing() {
  const { user } = useAuthStore();
  const { data: billingInfo, isLoading: billingLoading } = useBilling();
  const { mutate: createCheckout, isPending: checkoutLoading } = useCreateCheckout();
  const { mutate: createPortal, isPending: portalLoading } = useCreatePortalSession();

  const handleSubscribe = (plan) => {
    createCheckout(plan);
  };

  const handleManageBilling = () => {
    createPortal();
  };

  const plans = [
    {
      name: 'Free',
      id: 'free',
      price: '$0',
      description: 'Perfect for small teams getting started.',
      icon: Shield,
      features: ['2 Job Posts / month', '5 AI ATS Analyses', 'Basic Candidate Search', 'Standard Support'],
      color: 'blue'
    },
    {
      name: 'Pro',
      id: 'pro',
      price: '$99',
      period: '/mo',
      description: 'Advanced AI features for growing companies.',
      icon: Sparkles,
      features: ['20 Job Posts / month', '50 AI ATS Analyses', 'AI Candidate Ranking', 'AI Interview Generation', 'Priority Support'],
      color: 'indigo',
      popular: true
    },
    {
      name: 'Enterprise',
      id: 'enterprise',
      price: '$299',
      period: '/mo',
      description: 'Maximum power for large scale hiring.',
      icon: Zap,
      features: ['Unlimited Job Posts', 'Unlimited AI Analyses', 'AI Fraud Detection', 'Custom API Access', '24/7 Dedicated Support'],
      color: 'emerald'
    }
  ];

  if (billingLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Pricing Plans for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AETHER</span>
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Choose the perfect plan to supercharge your hiring process with artificial intelligence.
          </p>
        </div>

        {billingInfo?.plan !== 'free' && (
          <div className="mb-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Current Plan: <span className="uppercase text-indigo-400">{billingInfo?.plan}</span></h3>
              <p className="text-slate-400 text-sm mt-1">Status: {billingInfo?.status}</p>
            </div>
            <button 
              onClick={handleManageBilling}
              disabled={portalLoading}
              className="mt-4 sm:mt-0 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all flex items-center gap-2"
            >
              {portalLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Manage Billing
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrentPlan = billingInfo?.plan === plan.id;

            return (
              <div 
                key={plan.id}
                className={cn(
                  "relative rounded-3xl p-8 border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2",
                  plan.popular ? "bg-indigo-900/20 border-indigo-500/50" : "bg-slate-900/50 border-slate-800",
                  isCurrentPlan ? "ring-2 ring-indigo-500" : ""
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-xs font-bold text-white tracking-widest uppercase">
                    Most Popular
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("p-2 rounded-lg", `bg-${plan.color}-500/20 text-${plan.color}-400`)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                </div>
                
                <p className="text-slate-400 text-sm h-10">{plan.description}</p>
                
                <div className="my-6">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-slate-400 font-medium">{plan.period}</span>}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                      <Check className={cn("h-5 w-5 shrink-0", `text-${plan.color}-400`)} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={isCurrentPlan || checkoutLoading || plan.id === 'free'}
                  className={cn(
                    "w-full py-3 px-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2",
                    isCurrentPlan 
                      ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                      : plan.popular
                        ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                  )}
                >
                  {checkoutLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : isCurrentPlan ? 'Current Plan' : plan.id === 'free' ? 'Included' : 'Upgrade Now'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
