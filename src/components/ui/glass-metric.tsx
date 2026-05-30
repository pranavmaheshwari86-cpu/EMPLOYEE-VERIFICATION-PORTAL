"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

export interface GlassMetricProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  animate?: boolean;
  decimals?: number;
}

export function GlassMetric({
  label,
  value,
  prefix = "",
  suffix = "",
  icon,
  trend,
  trendValue,
  animate = true,
  className,
  ...props
}: GlassMetricProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!animate) {
      setDisplayValue(value);
      return;
    }

    if (isInView) {
      let startTimestamp: number;
      const duration = 2000; // 2 seconds

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setDisplayValue(Math.floor(easeProgress * value));
        
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setDisplayValue(value);
        }
      };
      
      requestAnimationFrame(step);
    }
  }, [value, animate, isInView]);

  const formattedValue = displayValue.toLocaleString("en-US");

  return (
    <motion.div
      ref={ref}
      initial={animate ? { opacity: 0, y: 20 } : false}
      animate={isInView || !animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "glass-md rounded-2xl p-6 relative overflow-hidden group",
        "hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300",
        className
      )}
      {...(props as any)}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-aetheris-muted text-sm font-medium">{label}</div>
        {icon && (
          <div className="w-10 h-10 rounded-xl glass flex items-center justify-center text-aetheris-cyan shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-shadow">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="font-display text-3xl font-bold tracking-tight text-white">
          {prefix}{formattedValue}{suffix}
        </span>
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
          {trend === "up" && (
            <span className="flex items-center text-aetheris-emerald bg-aetheris-emerald/10 px-2 py-0.5 rounded-full">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              {trendValue}
            </span>
          )}
          {trend === "down" && (
            <span className="flex items-center text-aetheris-rose bg-aetheris-rose/10 px-2 py-0.5 rounded-full">
              <ArrowDownRight className="w-3 h-3 mr-1" />
              {trendValue}
            </span>
          )}
          {trend === "neutral" && (
            <span className="flex items-center text-aetheris-muted bg-white/5 px-2 py-0.5 rounded-full">
              <Minus className="w-3 h-3 mr-1" />
              {trendValue}
            </span>
          )}
          <span className="text-aetheris-subtle">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
