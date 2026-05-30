"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/effects/particle-field").then(mod => mod.ParticleField), {
  ssr: false
});
import { AuroraBackground } from "@/components/effects/aurora-background";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { TextReveal } from "@/components/effects/text-reveal";
import { GlassButton } from "@/components/ui/glass-button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-aetheris-void text-aetheris-white overflow-hidden flex flex-col items-center justify-center font-sans">
      <AuroraBackground intensity="medium" />
      <ParticleField className="opacity-40" interactive color="cyan" />
      <CursorGlow />

      <div className="relative z-10 container-aetheris flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="text-[12rem] md:text-[18rem] font-display font-bold leading-none tracking-tighter opacity-10 blur-sm absolute inset-0 text-aetheris-cyan animate-pulse">
            404
          </div>
          <div className="text-[12rem] md:text-[18rem] font-display font-bold leading-none tracking-tighter gradient-text-primary relative z-10 mix-blend-overlay">
            404
          </div>
        </motion.div>

        <div className="mt-8 mb-12 relative z-20">
          <TextReveal as="h1" className="text-2xl md:text-4xl font-display font-bold mb-4">
            Signal Lost in the Void
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-aetheris-muted max-w-lg mx-auto text-lg"
          >
            The sector you are trying to access does not exist or has been relocated within the neural network.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 relative z-20"
        >
          <Link href="/">
            <GlassButton variant="primary" size="lg" icon={<Home className="w-4 h-4" />}>
              Return to Platform
            </GlassButton>
          </Link>
          <GlassButton 
            variant="ghost" 
            size="lg" 
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => window.history.back()}
          >
            Go Back
          </GlassButton>
        </motion.div>
      </div>
      
      {/* Footer minimal */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-0 right-0 text-center text-xs text-aetheris-subtle z-20"
      >
        AETHERIS // SYSTEM ERROR PROTOCOL // 404
      </motion.div>
    </div>
  );
}
