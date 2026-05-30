import React from "react";
import { cn } from "@/lib/utils";

interface GlassAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  ring?: "cyan" | "violet" | "emerald" | "blue" | "rose" | "none";
  fallback: string;
}

export function GlassAvatar({
  src,
  alt,
  size = "md",
  status,
  ring = "none",
  fallback,
  className,
  ...props
}: GlassAvatarProps) {
  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-xs";
      case "md":
        return "w-10 h-10 text-sm";
      case "lg":
        return "w-14 h-14 text-base";
      case "xl":
        return "w-20 h-20 text-xl";
    }
  };

  const getRingStyles = () => {
    switch (ring) {
      case "cyan":
        return "ring-2 ring-aetheris-cyan ring-offset-2 ring-offset-aetheris-black shadow-[0_0_15px_rgba(6,182,212,0.3)]";
      case "blue":
        return "ring-2 ring-aetheris-blue ring-offset-2 ring-offset-aetheris-black shadow-[0_0_15px_rgba(59,130,246,0.3)]";
      case "violet":
        return "ring-2 ring-aetheris-violet ring-offset-2 ring-offset-aetheris-black shadow-[0_0_15px_rgba(139,92,246,0.3)]";
      case "emerald":
        return "ring-2 ring-aetheris-emerald ring-offset-2 ring-offset-aetheris-black shadow-[0_0_15px_rgba(16,185,129,0.3)]";
      case "rose":
        return "ring-2 ring-aetheris-rose ring-offset-2 ring-offset-aetheris-black shadow-[0_0_15px_rgba(244,63,94,0.3)]";
      case "none":
        return "border border-white/10";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "online":
        return "bg-aetheris-emerald";
      case "offline":
        return "bg-aetheris-subtle";
      case "away":
        return "bg-aetheris-amber";
      case "busy":
        return "bg-aetheris-rose";
      default:
        return null;
    }
  };

  const statusColor = getStatusColor();

  return (
    <div className={cn("relative inline-block", className)} {...props}>
      <div
        className={cn(
          "rounded-full overflow-hidden flex items-center justify-center bg-white/5 backdrop-blur-md text-aetheris-white font-medium",
          getSizeStyles(),
          getRingStyles()
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Avatar"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="uppercase tracking-wider">{fallback.substring(0, 2)}</span>
        )}
      </div>

      {statusColor && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-aetheris-black",
            statusColor,
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-2.5 h-2.5" : size === "lg" ? "w-3 h-3" : "w-4 h-4"
          )}
        />
      )}
    </div>
  );
}
