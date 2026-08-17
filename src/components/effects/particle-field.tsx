"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseColor: string;
}

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  color?: "cyan" | "blue" | "mixed";
  speed?: number;
  connectionDistance?: number;
  interactive?: boolean;
}

export function ParticleField({
  className,
  particleCount = 80,
  color = "mixed",
  speed = 0.3,
  connectionDistance = 120,
  interactive = true,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 }); // start offscreen
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const getColors = () => {
      switch (color) {
        case "cyan":
          return ["6, 182, 212"]; // aetheris-cyan
        case "blue":
          return ["59, 130, 246"]; // aetheris-blue
        case "mixed":
        default:
          return [
            "6, 182, 212", // cyan
            "59, 130, 246", // blue
            "139, 92, 246", // violet
          ];
      }
    };

    const colors = getColors();

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          baseColor: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        
        // Ensure CSS size remains the same
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        
        // Scale context to match device pixel ratio
        ctx.scale(dpr, dpr);
        initParticles();
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseleave", handleMouseLeave);
    }

    const connDistSq = connectionDistance * connectionDistance;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const len = particles.length;

      // Update positions & draw
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around (toroidal)
        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        // Mouse repulsion
        if (interactive) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < 22500 && distSq > 0) { // 150^2 = 22500
            const dist = Math.sqrt(distSq);
            const force = (150 - dist) / 150;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.baseColor}, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        if (connectionDistance > 0) {
          for (let j = i + 1; j < len; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < connDistSq) {
              const dist = Math.sqrt(distSq);
              const opacity = (1 - dist / connectionDistance) * 0.2;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${p.baseColor}, ${opacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, color, speed, connectionDistance, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block w-full h-full will-change-transform", className)}
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    />
  );
}
