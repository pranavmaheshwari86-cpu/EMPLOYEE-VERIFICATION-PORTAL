"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { CheckCircle2, Zap, Shield, Globe, Users, CreditCard, Building } from "lucide-react";

const PLANS = [
  {
    id: "startup",
    name: "Startup",
    price: "$299",
    period: "per month",
    description: "Perfect for growing teams hiring up to 5 roles.",
    features: [
      "Up to 5 active job postings",
      "Basic AI Candidate Matching",
      "Standard Verification (Identity)",
      "Email Support",
      "5 Team Members"
    ],
    recommended: false,
    icon: Zap
  },
  {
    id: "growth",
    name: "Growth",
    price: "$799",
    period: "per month",
    description: "Advanced AI features for rapidly scaling companies.",
    features: [
      "Unlimited active job postings",
      "Advanced AI Matching & Ranking",
      "Full Verification (Identity, Skills, Exp)",
      "AI Interview Prep Simulator access",
      "Priority 24/7 Support",
      "Unlimited Team Members"
    ],
    recommended: true,
    icon: Shield
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "billed annually",
    description: "Custom solutions for large organizations.",
    features: [
      "Everything in Growth",
      "Custom AI Model Training",
      "Dedicated Account Manager",
      "API Access & Integrations",
      "Custom Verification Workflows",
      "SSO & Advanced Security"
    ],
    recommended: false,
    icon: Globe
  }
];

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Transparent Pricing for Modern Teams</h1>
        <p className="text-aetheris-muted">Scale your hiring with our AI-powered network. Upgrade or downgrade at any time.</p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
           <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-aetheris-muted'}`}>Monthly</span>
           <button 
             onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
             className="w-14 h-7 rounded-full bg-white/10 relative border border-white/20 transition-colors hover:bg-white/20"
           >
             <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-aetheris-cyan transition-all duration-300 ${
               billingCycle === 'annual' ? 'left-[calc(100%-24px)]' : 'left-1'
             }`} />
           </button>
           <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-white' : 'text-aetheris-muted'}`}>
             Annually <span className="text-xs text-emerald-400 ml-1 px-2 py-0.5 rounded-full bg-emerald-500/10">Save 20%</span>
           </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan) => {
          const Icon = plan.icon;
          const parsedPrice = parseInt(plan.price.replace('$', ''));
          const displayPrice = billingCycle === 'annual' && !isNaN(parsedPrice)
            ? `$${Math.floor(parsedPrice * 0.8)}`
            : plan.price;
            
          return (
            <div key={plan.id} className="relative">
              {plan.recommended && (
                <div className="absolute -top-4 inset-x-0 flex justify-center z-10">
                  <span className="bg-aetheris-cyan text-[#0a0a0a] text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                    Most Popular
                  </span>
                </div>
              )}
              <GlassCard 
                padding="xl" 
                className={`h-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                  plan.recommended 
                    ? 'border-aetheris-cyan/50 shadow-[0_0_30px_rgba(6,182,212,0.1)] scale-105 z-0' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Background Glow for Recommended */}
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-aetheris-cyan/20 blur-[100px] pointer-events-none" />
                )}

                <div className="mb-8 relative z-10">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    plan.recommended ? 'bg-aetheris-cyan/20 text-aetheris-cyan' : 'bg-white/5 text-white'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-white">{displayPrice}</span>
                    <span className="text-aetheris-muted text-sm">{plan.period}</span>
                  </div>
                  <p className="text-sm text-aetheris-muted">{plan.description}</p>
                </div>

                <div className="flex-1 relative z-10">
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 ${plan.recommended ? 'text-aetheris-cyan' : 'text-white/40'}`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <GlassButton 
                  variant={plan.recommended ? 'primary' : 'secondary'} 
                  className={`w-full relative z-10 ${!plan.recommended ? 'bg-white/5 hover:bg-white/10' : ''}`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </GlassButton>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* Current Billing Details (Mocked for UI) */}
      <div className="pt-12 border-t border-white/10">
         <h2 className="text-xl font-bold text-white mb-6">Current Subscription</h2>
         
         <div className="grid md:grid-cols-2 gap-6">
            <GlassCard padding="lg">
               <div className="flex items-center justify-between mb-6">
                 <div className="flex items-center gap-3">
                   <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                     <Building className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <div className="text-sm text-aetheris-muted">Active Plan</div>
                     <div className="text-lg font-bold text-white">Startup Plan (Monthly)</div>
                   </div>
                 </div>
                 <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full border border-emerald-500/20">
                   Active
                 </span>
               </div>
               
               <div className="space-y-3 mb-6">
                 <div className="flex justify-between text-sm">
                   <span className="text-aetheris-muted">Next billing date</span>
                   <span className="text-white">June 28, 2026</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-aetheris-muted">Amount</span>
                   <span className="text-white">$299.00</span>
                 </div>
               </div>

               <div className="flex gap-3">
                 <GlassButton variant="secondary" size="sm" className="w-full">Cancel Plan</GlassButton>
                 <GlassButton variant="primary" size="sm" className="w-full">Upgrade</GlassButton>
               </div>
            </GlassCard>

            <GlassCard padding="lg">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                   <CreditCard className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <div className="text-sm text-aetheris-muted">Payment Method</div>
                   <div className="text-lg font-bold text-white">Visa ending in 4242</div>
                 </div>
               </div>

               <div className="text-sm text-aetheris-muted mb-6">
                 Expires 12/2028 <br/>
                 Billing email: billing@company.com
               </div>

               <GlassButton variant="secondary" size="sm">
                 Update Payment Method
               </GlassButton>
            </GlassCard>
         </div>
      </div>
    </div>
  );
}
