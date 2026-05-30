"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Brain, Users, BarChart3, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../effects/particle-field").then(mod => mod.ParticleField), {
  ssr: false
});
import { AnimatedCounter } from "../effects/animated-counter";
import { TextReveal } from "../effects/text-reveal";
import { GlassButton } from "../ui/glass-button";
import { GlassMetric } from "../ui/glass-metric";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-aetheris-black z-0" />
      <div className="absolute inset-0 z-0">
        <ParticleField color="cyan" interactive={true} />
      </div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_center,_rgba(6,182,212,0.15),_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.1),_transparent_50%)] pointer-events-none" />

      {/* Content */}
      <div className="container-aetheris relative z-10 flex flex-col items-center text-center px-4 w-full max-w-7xl mx-auto">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-sm rounded-full px-4 py-1.5 mb-8 border border-aetheris-cyan/30 flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-aetheris-cyan animate-pulse-glow" />
          <span className="text-xs font-medium tracking-wide uppercase text-aetheris-cyan">
            AI-Native Verification Platform
          </span>
        </motion.div>

        {/* Main Headline */}
        <div className="mb-6 w-full max-w-5xl mx-auto">
          <TextReveal as="h1" className="text-hero font-display font-bold leading-[1.1] tracking-tight">
            AI-Powered Smart Hiring & Employee Verification Platform
          </TextReveal>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-aetheris-muted max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Helping companies hire verified talent and helping candidates get trusted opportunities.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 mb-20"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center">
            <Link href="/auth/login?role=employee">
              <GlassButton size="lg" variant="primary" magnetic icon={<ArrowRight className="w-5 h-5" />}>
                Login as Employee
              </GlassButton>
            </Link>
            <Link href="/auth/login?role=company">
              <GlassButton size="lg" variant="outline" magnetic>
                Login as Company
              </GlassButton>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-center mt-2 sm:mt-0">
            <Link href="/jobs">
              <GlassButton size="lg" variant="outline" magnetic>
                Explore Jobs
              </GlassButton>
            </Link>
            <Link href="/auth/register?role=company">
              <GlassButton size="lg" variant="outline" magnetic>
                Verify Employees
              </GlassButton>
            </Link>
          </div>
        </motion.div>

        {/* Floating Glass Metrics Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="animate-float"
            style={{ animationDelay: "0s" }}
          >
            <GlassMetric
              label="Candidates Verified"
              value={12847}
              suffix="+"
              icon={<Shield className="w-5 h-5" />}
              className="bg-white/[0.02]"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="animate-float-slow"
            style={{ animationDelay: "1s" }}
          >
            <GlassMetric
              label="AI Evaluations"
              value={2.4}
              suffix="M"
              decimals={1}
              icon={<Brain className="w-5 h-5" />}
              className="bg-white/[0.02]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="animate-float"
            style={{ animationDelay: "2s" }}
          >
            <GlassMetric
              label="Companies Hiring"
              value={8500}
              suffix="+"
              icon={<Users className="w-5 h-5" />}
              className="bg-white/[0.02]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="animate-float-slow"
            style={{ animationDelay: "0.5s" }}
          >
            <GlassMetric
              label="Accuracy Rate"
              value={99.2}
              suffix="%"
              decimals={1}
              icon={<BarChart3 className="w-5 h-5" />}
              className="bg-white/[0.02]"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-aetheris-white/50">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-aetheris-cyan/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
