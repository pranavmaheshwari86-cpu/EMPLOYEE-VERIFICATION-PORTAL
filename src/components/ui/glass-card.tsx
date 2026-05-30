"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "highlight" | "elevated";
  hover?: boolean;
  glow?: "cyan" | "blue" | "violet" | "none";
  padding?: "sm" | "md" | "lg" | "xl" | "none";
}

export function GlassCard({
  className,
  children,
  variant = "default",
  hover = false,
  glow = "none",
  padding = "md",
  ...props
}: GlassCardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "highlight":
        return "glass-highlight";
      case "elevated":
        return "glass-lg";
      default:
        return "glass-md";
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case "sm":
        return "p-4";
      case "md":
        return "p-6";
      case "lg":
        return "p-8";
      case "xl":
        return "p-10";
      case "none":
        return "p-0";
    }
  };

  const getGlowClass = () => {
    switch (glow) {
      case "cyan":
        return "glow-cyan";
      case "blue":
        return "glow-blue";
      case "violet":
        return "glow-violet";
      default:
        return "";
    }
  };

  const baseClass = cn(
    "rounded-2xl relative overflow-hidden transition-all duration-300",
    getVariantClass(),
    getPaddingClass(),
    className
  );

  if (hover) {
    return (
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.01,
          boxShadow: glow !== "none" ? undefined : "0 20px 40px -10px rgba(0,0,0,0.5)",
        }}
        className={cn(baseClass, getGlowClass(), "hover:border-white/20 hover:bg-white/[0.05]")}
        style={{ willChange: "transform, box-shadow" }}
        {...props as any}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={cn(baseClass, getGlowClass())} {...props}>
      {children}
    </div>
  );
}
