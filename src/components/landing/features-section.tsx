"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, Shield, Zap } from "lucide-react";
import { TextReveal } from "../effects/text-reveal";
import { GlassCard } from "../ui/glass-card";

export function FeaturesSection() {
  const features = [
    {
      title: "Immutable Identity",
      description: "Every professional profile on AETHERIS is cryptographically secured and verified through multi-factor employer consensus.",
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Real-time Verification",
      description: "Say goodbye to 3-week background checks. AETHERIS verifies employment history, education, and credentials in milliseconds.",
      icon: <Zap className="w-8 h-8" />,
    },
    {
      title: "Skill Graph Analysis",
      description: "Our AI maps the exact technologies and capabilities a candidate demonstrated at their previous roles, not just their job title.",
      icon: <Search className="w-8 h-8" />,
    },
    {
      title: "Consensus Validation",
      description: "Skills are validated by a network of former managers and peers, creating a trustless system of professional capability.",
      icon: <CheckCircle2 className="w-8 h-8" />,
    },
  ];

  return (
    <section id="platform" className="py-32 relative z-10">
      <div className="container-aetheris">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6">
            The hiring operating system of the future.
          </TextReveal>
          <p className="text-lg text-aetheris-muted">
            The traditional resume is broken. It's a static, unverified document optimized for applicant tracking systems, not for discovering exceptional talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hover glow="cyan" className="h-full flex flex-col md:flex-row gap-6 items-start">
                <div className="shrink-0 p-4 rounded-2xl glass-sm text-aetheris-cyan bg-aetheris-cyan/5">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-aetheris-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
