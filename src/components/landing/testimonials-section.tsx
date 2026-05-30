"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "../effects/text-reveal";
import { GlassCard } from "../ui/glass-card";
import { GlassAvatar } from "../ui/glass-avatar";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "AETHERIS completely changed how we hire engineers. We no longer rely on leetcode puzzles; we look at their actual verified capabilities mapped by AI. Our retention rate is up 40%.",
      author: "Sarah Jenkins",
      role: "VP of Engineering at Scale AI",
      initials: "SJ",
      color: "cyan"
    },
    {
      quote: "The consensus verification feature is brilliant. Getting cryptographic proof that a candidate actually led a project from their former peers eliminates the guesswork in hiring.",
      author: "David Chen",
      role: "CTO at Nexus Finance",
      initials: "DC",
      color: "violet"
    },
    {
      quote: "As a candidate, I was tired of rewriting my resume for every application. AETHERIS lets my actual work speak for me. I got hired by a top-tier startup in 48 hours.",
      author: "Elena Rodriguez",
      role: "Senior Full Stack Engineer",
      initials: "ER",
      color: "blue"
    }
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="container-aetheris">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6">
            Built for the world's best teams.
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <GlassCard padding="lg" hover className="h-full flex flex-col">
                <Quote className="w-8 h-8 text-aetheris-muted/50 mb-6" />
                <p className="text-aetheris-white text-lg leading-relaxed flex-1 mb-8">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <GlassAvatar fallback={testimonial.initials} ring={testimonial.color as any} />
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-aetheris-muted">{testimonial.role}</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
