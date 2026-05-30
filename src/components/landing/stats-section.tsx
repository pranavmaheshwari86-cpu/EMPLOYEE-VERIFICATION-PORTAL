"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedCounter } from "../effects/animated-counter";

export function StatsSection() {
  const stats = [
    { label: "Hours Saved per Hire", value: 45, suffix: "+" },
    { label: "Reduction in Bad Hires", value: 92, suffix: "%" },
    { label: "Time to Verify", value: 3.5, suffix: "s", decimals: 1 },
    { label: "Data Points Analyzed", value: 1.2, suffix: "B", decimals: 1 },
  ];

  return (
    <section className="py-24 border-y border-white/[0.06] bg-white/[0.01] relative z-10">
      <div className="container-aetheris">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-mono font-bold text-white mb-2">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-sm font-medium text-aetheris-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
