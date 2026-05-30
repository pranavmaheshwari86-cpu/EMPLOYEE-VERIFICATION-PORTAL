"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cpu, Database, Network, Search, Zap } from "lucide-react";
import { AuroraBackground } from "../effects/aurora-background";
import { TextReveal } from "../effects/text-reveal";
import { GlassCard } from "../ui/glass-card";
import { cn } from "@/lib/utils";

export function AISection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const aiFeatures = [
    {
      title: "Contextual Code Analysis",
      description: "Our LLMs analyze GitHub repositories to verify not just what a candidate built, but how they built it—evaluating architecture, code quality, and security.",
      icon: <Cpu className="w-6 h-6" />,
      color: "cyan",
    },
    {
      title: "Semantic Skill Graph",
      description: "Moving beyond keyword matching, AETHERIS maps semantic relationships between technologies to understand true capability across ecosystems.",
      icon: <Network className="w-6 h-6" />,
      color: "violet",
    },
    {
      title: "Behavioral Intelligence",
      description: "Analyzing communication patterns in open-source contributions and team interactions to assess soft skills and cultural fit with high precision.",
      icon: <Brain className="w-6 h-6" />,
      color: "blue",
    },
  ];

  return (
    <section id="intelligence" className="relative py-32 overflow-hidden">
      {/* Background */}
      <AuroraBackground intensity="medium" colors={["rgba(6,182,212,0.1)", "rgba(139,92,246,0.1)", "transparent"]} />
      
      <div className="container-aetheris relative z-10" ref={ref}>
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-sm border-aetheris-violet/30 text-aetheris-violet text-sm font-medium mb-6"
          >
            <Brain className="w-4 h-4" />
            Neural Infrastructure
          </motion.div>
          
          <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6">
            Intelligence beyond human scale.
          </TextReveal>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-aetheris-muted"
          >
            AETHERIS uses proprietary multi-modal AI to evaluate candidates exactly like a senior engineering manager would—but in milliseconds and without bias.
          </motion.p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {aiFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <GlassCard hover glow={feature.color as any} className="h-full">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-6",
                  feature.color === "cyan" ? "bg-aetheris-cyan/10 text-aetheris-cyan shadow-[0_0_20px_rgba(6,182,212,0.2)]" :
                  feature.color === "violet" ? "bg-aetheris-violet/10 text-aetheris-violet shadow-[0_0_20px_rgba(139,92,246,0.2)]" :
                  "bg-aetheris-blue/10 text-aetheris-blue shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-aetheris-muted leading-relaxed">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Visual Terminal/Neural Interface representation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 glass-lg rounded-3xl p-1 overflow-hidden relative border border-white/10"
        >
          {/* Inner glass layer */}
          <div className="bg-aetheris-black/80 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-aetheris-rose/80" />
                <div className="w-3 h-3 rounded-full bg-aetheris-amber/80" />
                <div className="w-3 h-3 rounded-full bg-aetheris-emerald/80" />
              </div>
              <div className="mx-auto flex items-center gap-2 text-xs text-aetheris-subtle font-mono">
                <Search className="w-3 h-3" />
                AETHERIS // Neural Analysis
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 font-mono text-sm">
                <div className="text-aetheris-cyan">&gt;&nbsp;initializing deep evaluation sequence...</div>
                <div className="text-aetheris-subtle">&gt;&nbsp;fetching github.com/user/hyper-scale-db</div>
                <div className="text-aetheris-blue">&gt;&nbsp;analyzing concurrency models: found advanced Rust async patterns</div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-aetheris-cyan animate-pulse" />
                  <span className="text-aetheris-white">evaluating architectural decisions</span>
                </div>
              </div>
              
              <div className="relative h-40 glass-sm rounded-xl overflow-hidden flex items-center justify-center border border-aetheris-cyan/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1),_transparent_70%)]" />
                <Database className="w-12 h-12 text-aetheris-cyan animate-pulse-glow" />
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <line x1="20" y1="50" x2="40" y2="50" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" strokeDasharray="2,2" />
                  <line x1="60" y1="50" x2="80" y2="50" stroke="rgba(6,182,212,0.5)" strokeWidth="0.5" strokeDasharray="2,2" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
