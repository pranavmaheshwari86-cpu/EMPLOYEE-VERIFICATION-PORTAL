"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "../effects/text-reveal";
import { GlassCard } from "../ui/glass-card";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Connect Identity",
      description: "Candidates connect their professional profiles, GitHub, and previous work emails. Our system instantly verifies their digital footprint.",
      color: "cyan"
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "AETHERIS neural engine analyzes millions of data points—code commits, project contributions, and peer interactions—to map true capabilities.",
      color: "blue"
    },
    {
      number: "03",
      title: "Consensus Check",
      description: "Former managers and verified peers validate specific skills through a 1-click cryptographic consensus system.",
      color: "violet"
    }
  ];

  return (
    <section id="verification" className="py-32 relative z-10 bg-aetheris-black/50">
      <div className="container-aetheris">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6">
            Frictionless intelligence.
          </TextReveal>
          <p className="text-lg text-aetheris-muted">
            The process is seamless for candidates and instantaneous for employers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative z-10"
            >
              <GlassCard padding="lg" hover glow={step.color as any} className="h-full text-center group">
                <div className="w-16 h-16 mx-auto rounded-full glass flex items-center justify-center text-2xl font-mono font-bold text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-aetheris-muted leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
