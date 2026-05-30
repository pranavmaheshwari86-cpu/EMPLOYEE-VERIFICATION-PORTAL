"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Hexagon, Zap } from "lucide-react";
import { GlassButton } from "../ui/glass-button";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("../effects/particle-field").then(mod => mod.ParticleField), {
  ssr: false
});
import Link from "next/link";

export function CTASection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden border-t border-white/[0.06]">
      <div className="absolute inset-0 z-0">
        <ParticleField color="cyan" interactive={true} particleCount={40} speed={0.2} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-aetheris-cyan/5 z-0 pointer-events-none" />

      <div className="container-aetheris relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto glass-lg rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden border border-aetheris-cyan/20"
        >
          {/* Inner Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.15),_transparent_70%)] pointer-events-none" />

          <div className="relative flex items-center justify-center mb-8">
            <Hexagon className="w-16 h-16 text-aetheris-cyan opacity-80" strokeWidth={1} />
            <Zap className="w-8 h-8 text-aetheris-cyan absolute animate-pulse-glow" strokeWidth={1.5} />
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Ready to experience the future of hiring?
          </h2>
          
          <p className="text-xl text-aetheris-muted mb-12 max-w-2xl mx-auto">
            Join thousands of forward-thinking companies building their teams on the AETHERIS network.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <GlassButton size="lg" variant="primary" magnetic icon={<ArrowRight className="w-5 h-5" />}>
                Request Early Access
              </GlassButton>
            </Link>
            <Link href="/auth/login">
              <GlassButton size="lg" variant="ghost" magnetic>
                Sign in to your account
              </GlassButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
