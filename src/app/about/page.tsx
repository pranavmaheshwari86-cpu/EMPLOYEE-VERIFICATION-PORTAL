"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Zap, Globe, Target, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { GlassCard } from "@/components/ui/glass-card";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/effects/particle-field").then(mod => mod.ParticleField), {
  ssr: false
});
import { TextReveal } from "@/components/effects/text-reveal";

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      title: "Trust by Default",
      description: "We believe hiring should be based on verified truth, not inflated claims. Our AI ensures 99.9% accuracy in skill verification.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Speed of Intelligence",
      description: "What used to take weeks of background checks now takes seconds. We accelerate the hiring pipeline for top companies.",
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-400" />,
      title: "Borderless Talent",
      description: "Great talent is everywhere. We level the playing field by verifying skills objectively, regardless of geographic location.",
    },
    {
      icon: <Target className="w-6 h-6 text-rose-400" />,
      title: "Precision Matching",
      description: "Our neural networks don't just match keywords; they understand context, capability, and cultural fit.",
    },
  ];

  return (
    <div className="min-h-screen bg-aetheris-black flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <ParticleField color="cyan" particleCount={40} />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-[radial-gradient(ellipse_at_top_center,_rgba(6,182,212,0.15),_transparent_60%)] pointer-events-none" />

        <div className="container-aetheris relative z-10 px-4">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-sm mb-6 border-aetheris-cyan/30 text-aetheris-cyan text-sm font-medium tracking-wide"
            >
              <Users className="w-4 h-4" />
              <span>Our Mission</span>
            </motion.div>
            
            <TextReveal as="h1" className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
              Engineering the Future of Human Capital
            </TextReveal>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-aetheris-muted leading-relaxed"
            >
              AETHERIS was founded on a simple premise: the traditional resume is broken. We're building the world's first AI-native ecosystem where talent is proven, not just claimed, and companies hire with absolute cryptographic certainty.
            </motion.p>
          </div>

          {/* The Problem / Solution Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-32 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="h-full p-8 border-rose-500/20 bg-rose-500/5">
                <h3 className="text-2xl font-display font-bold text-rose-100 mb-4">The Old Way</h3>
                <ul className="space-y-4 text-aetheris-muted">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 mt-1">✕</span>
                    <span>Self-reported skills on static PDFs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 mt-1">✕</span>
                    <span>Weeks of manual background checks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 mt-1">✕</span>
                    <span>Keyword-matching ATS systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 mt-1">✕</span>
                    <span>Bias towards pedigree over capability</span>
                  </li>
                </ul>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="h-full p-8 border-emerald-500/20 bg-emerald-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full" />
                <h3 className="text-2xl font-display font-bold text-emerald-100 mb-4 relative z-10">The AETHERIS Way</h3>
                <ul className="space-y-4 text-aetheris-muted relative z-10">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Cryptographically verified project history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Instant AI-driven technical assessments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Context-aware neural matching</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span>Meritocratic discovery based on pure skill</span>
                  </li>
                </ul>
              </GlassCard>
            </motion.div>
          </div>

          {/* Core Values */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">Core Principles</h2>
              <p className="text-aetheris-muted max-w-2xl mx-auto">The foundational values that drive our engineering and design decisions.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <GlassCard className="h-full p-6 flex flex-col hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 shrink-0">
                      {value.icon}
                    </div>
                    <h4 className="text-lg font-bold text-aetheris-white mb-2">{value.title}</h4>
                    <p className="text-sm text-aetheris-muted flex-1">{value.description}</p>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
