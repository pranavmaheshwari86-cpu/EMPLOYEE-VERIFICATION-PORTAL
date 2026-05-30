import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, Sparkles, AlertTriangle, XCircle, Shield } from "lucide-react";

interface GlassBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "verified" | "premium" | "ai" | "warning" | "danger";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  pulse?: boolean;
}

export function GlassBadge({
  children,
  variant = "default",
  size = "md",
  icon,
  pulse = false,
  className,
  ...props
}: GlassBadgeProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "verified":
        return "border-aetheris-emerald/30 bg-aetheris-emerald/10 text-aetheris-emerald shadow-[0_0_10px_rgba(16,185,129,0.2)]";
      case "premium":
        return "border-aetheris-violet/30 bg-aetheris-violet/10 text-aetheris-violet shadow-[0_0_10px_rgba(139,92,246,0.2)]";
      case "ai":
        return "border-aetheris-cyan/30 bg-aetheris-cyan/10 text-aetheris-cyan shadow-[0_0_10px_rgba(6,182,212,0.2)]";
      case "warning":
        return "border-aetheris-amber/30 bg-aetheris-amber/10 text-aetheris-amber shadow-[0_0_10px_rgba(245,158,11,0.2)]";
      case "danger":
        return "border-aetheris-rose/30 bg-aetheris-rose/10 text-aetheris-rose shadow-[0_0_10px_rgba(244,63,94,0.2)]";
      default:
        return "border-white/10 bg-white/5 text-aetheris-muted";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0.5 text-xs gap-1";
      case "md":
        return "px-3 py-1 text-sm gap-1.5";
    }
  };

  const getDefaultIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case "verified":
        return <CheckCircle2 size={size === "sm" ? 12 : 14} />;
      case "premium":
        return <Shield size={size === "sm" ? 12 : 14} />;
      case "ai":
        return <Sparkles size={size === "sm" ? 12 : 14} />;
      case "warning":
        return <AlertTriangle size={size === "sm" ? 12 : 14} />;
      case "danger":
        return <XCircle size={size === "sm" ? 12 : 14} />;
      default:
        return null;
    }
  };

  const defaultIcon = getDefaultIcon();

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border backdrop-blur-md font-medium transition-all",
        getVariantStyles(),
        getSizeStyles(),
        pulse && "animate-pulse-glow",
        className
      )}
      {...props}
    >
      {defaultIcon && <span className="shrink-0">{defaultIcon}</span>}
      {children}
    </div>
  );
}
