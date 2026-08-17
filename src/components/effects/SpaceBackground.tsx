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
    <div className="fixed inset-0 bg-[#0a0a0c] overflow-hidden z-0 pointer-events-none">
      {/* Deep Space Atmosphere Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#13101c] via-[#0a0a0c] to-black opacity-80" />

      {/* Slowly Rotating Stars Layer - GPU Accelerated CSS */}
      <div 
        className="absolute -inset-[50%] opacity-40 mix-blend-screen animate-spin-slow will-change-transform"
        style={{
          backgroundImage: "radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 4px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 3px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 4px)",
          backgroundSize: "550px 550px, 350px 350px, 250px 250px",
          backgroundPosition: "0 0, 40px 60px, 130px 270px",
          animationDuration: "240s"
        }}
      />

      {/* Animated Subtle Particles */}
      <div className="absolute inset-0 opacity-15">
        <ParticleField particleCount={25} interactive={false} speed={0.08} color="mixed" connectionDistance={0} />
      </div>

      {/* Giant Left Planet (Floating) */}
      <div 
        className="absolute -left-[30vw] top-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full pointer-events-none opacity-90 transition-transform duration-1000"
        style={{
          background: "radial-gradient(circle at 80% 20%, #1a1a24 0%, #050508 60%, #000000 100%)",
          boxShadow: "inset -20px 20px 60px rgba(255,255,255,0.1), inset -5px 5px 20px rgba(255,255,255,0.3), 0 0 120px rgba(0,0,0,0.8)",
        }}
      />

      {/* Small Right Planet / Moon (Floating) */}
      <div 
        className="absolute right-[10%] top-[30%] w-24 h-24 rounded-full pointer-events-none opacity-90"
        style={{
          background: "radial-gradient(circle at 30% 30%, #2a2a35 0%, #050508 70%, #000000 100%)",
          boxShadow: "inset 5px 5px 15px rgba(255,255,255,0.15), 0 0 40px rgba(0,0,0,0.9)",
        }}
      />

      {/* Orbital Lines (SVG) */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-15"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <g style={{ transformOrigin: "10px 50px" }}>
          <ellipse 
            cx="10" cy="50" rx="80" ry="70" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.1" 
            strokeDasharray="0.5 0.5" 
          />
          <ellipse 
            cx="10" cy="50" rx="90" ry="80" 
            fill="none" 
            stroke="white" 
            strokeWidth="0.05" 
          />
        </g>
      </svg>
      
      {/* Vignette Overlay for cinematic edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#050508_100%)] pointer-events-none" />
    </div>
  );
}
