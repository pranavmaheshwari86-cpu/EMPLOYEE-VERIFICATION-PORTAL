"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { forwardRef, MouseEvent, useState } from "react";
import { Loader2 } from "lucide-react";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  loading?: boolean;
  magnetic?: boolean;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      loading,
      magnetic = false,
      children,
      disabled,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
      if (!magnetic || disabled || loading) return;
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.2;
      const y = (e.clientY - top - height / 2) * 0.2;
      mouseX.set(x);
      mouseY.set(y);
      if (onMouseMove) onMouseMove(e);
    }

    function handleMouseLeave(e: MouseEvent<HTMLButtonElement>) {
      setIsHovered(false);
      mouseX.set(0);
      mouseY.set(0);
      if (onMouseLeave) onMouseLeave(e);
    }

    const getVariantClass = () => {
      switch (variant) {
        case "primary":
          return "bg-gradient-to-b from-[#06b6d4] to-[#3b82f6] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_8px_16px_rgba(0,0,0,0.5),_0_0_20px_rgba(6,182,212,0.2)] border border-white/20 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),_0_12px_20px_rgba(0,0,0,0.6),_0_0_30px_rgba(6,182,212,0.4)] hover:-translate-y-[1px] active:translate-y-[1px] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]";
        case "secondary":
          return "glass-sm text-aetheris-white hover:bg-white/[0.08] hover:border-white/20";
        case "ghost":
          return "text-aetheris-muted hover:text-aetheris-white hover:bg-white/[0.05]";
        case "outline":
          return "border border-white/10 text-aetheris-white hover:border-aetheris-cyan/50 hover:bg-aetheris-cyan/5";
      }
    };

    const getSizeClass = () => {
      switch (size) {
        case "sm":
          return "px-4 py-2 text-sm";
        case "md":
          return "px-6 py-3 text-sm";
        case "lg":
          return "px-8 py-4 text-base";
      }
    };

    const content = (
      <>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && icon && <span className="mr-2">{icon}</span>}
        {children}
      </>
    );

    if (magnetic) {
      return (
        <motion.button
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            x: mouseX,
            y: mouseY,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          className={cn(
            "relative inline-flex flex-shrink-0 whitespace-nowrap items-center justify-center font-medium rounded-xl transition-colors duration-150",
            getVariantClass(),
            getSizeClass(),
            disabled || loading ? "opacity-50 cursor-not-allowed" : "",
            className
          )}
          disabled={disabled || loading}
          {...(props as any)}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex flex-shrink-0 whitespace-nowrap items-center justify-center font-medium rounded-xl transition-transform transition-opacity transition-colors duration-75 ease-out active:scale-95 active:opacity-90 active:translate-y-0.5 select-none touch-manipulation cursor-pointer",
          getVariantClass(),
          getSizeClass(),
          disabled || loading ? "opacity-50 cursor-not-allowed hover:translate-y-0 active:scale-100" : "",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    );
  }
);
GlassButton.displayName = "GlassButton";
