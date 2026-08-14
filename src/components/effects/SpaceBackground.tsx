"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ParticleField } from "./particle-field";

export function SpaceBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed inset-0 bg-[#0a0a0c] z-0" />;
  }

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] overflow-hidden z-0">
      {/* Deep Space Atmosphere Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13101c] via-[#0a0a0c] to-black opacity-80" />

      {/* Slowly Rotating Stars Layer */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-[50%] opacity-40 mix-blend-screen"
        style={{
          backgroundImage: "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 3px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 4px), radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 3px)",
          backgroundSize: "550px 550px, 350px 350px, 250px 250px, 150px 150px",
          backgroundPosition: "0 0, 40px 60px, 130px 270px, 70px 100px",
        }}
      />

      {/* Animated Subtle Particles */}
      <div className="absolute inset-0 opacity-20">
        <ParticleField particleCount={40} interactive={false} speed={0.1} color="mixed" connectionDistance={0} />
      </div>

      {/* Giant Left Planet (Floating) */}
      <motion.div 
        initial={{ x: -100, opacity: 0, y: "-50%" }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          y: ["-50%", "-52%", "-50%"] 
        }}
        transition={{ 
          x: { duration: 3, ease: "easeOut" },
          opacity: { duration: 3, ease: "easeOut" },
          y: { duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }
        }}
        className="absolute -left-[30vw] top-1/2 w-[80vw] h-[80vw] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, #1a1a24 0%, #050508 60%, #000000 100%)",
          boxShadow: "inset -20px 20px 60px rgba(255,255,255,0.1), inset -5px 5px 20px rgba(255,255,255,0.3), 0 0 120px rgba(0,0,0,0.8)",
        }}
      />

      {/* Small Right Planet / Moon (Floating) */}
      <motion.div 
        initial={{ x: 50, opacity: 0, y: 0 }}
        animate={{ 
          x: 0, 
          opacity: 1, 
          y: [0, -15, 0] 
        }}
        transition={{ 
          x: { duration: 4, ease: "easeOut", delay: 0.5 },
          opacity: { duration: 4, ease: "easeOut", delay: 0.5 },
          y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
        className="absolute right-[10%] top-[30%] w-24 h-24 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle at 30% 30%, #2a2a35 0%, #050508 70%, #000000 100%)",
          boxShadow: "inset 5px 5px 15px rgba(255,255,255,0.15), 0 0 40px rgba(0,0,0,0.9)",
        }}
      />

      {/* Orbital Lines (SVG) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 300, repeat: Infinity, ease: "linear" }}
          style={{ originX: "10px", originY: "50px" }}
        >
          <motion.ellipse 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 5, ease: "easeInOut" }}
            cx="10" cy="50" rx="80" ry="70" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.1" 
            strokeDasharray="0.5 0.5" 
          />
          <motion.ellipse 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 6, ease: "easeInOut", delay: 0.2 }}
            cx="10" cy="50" rx="90" ry="80" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.05" 
          />
          <motion.ellipse 
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 7, ease: "easeInOut", delay: 0.4 }}
            cx="10" cy="50" rx="100" ry="90" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.03" 
          />
        </motion.g>
      </svg>
      
      {/* Vignette Overlay for cinematic edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050508_100%)] pointer-events-none" />
    </div>
  );
}
