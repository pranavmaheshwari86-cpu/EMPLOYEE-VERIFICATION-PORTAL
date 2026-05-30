import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
  colors?: string[]; // Array of css colors
}

export function AuroraBackground({
  className,
  intensity = "subtle",
  colors = ["rgba(6,182,212,1)", "rgba(59,130,246,1)", "rgba(139,92,246,1)"],
}: AuroraBackgroundProps) {
  const getOpacity = () => {
    switch (intensity) {
      case "subtle":
        return 0.1;
      case "medium":
        return 0.2;
      case "strong":
        return 0.3;
      default:
        return 0.1;
    }
  };

  const opacity = getOpacity();

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden pointer-events-none z-0",
        className
      )}
    >
      <div className="absolute top-0 inset-x-0 h-[500px] opacity-30 bg-gradient-to-b from-[rgba(6,182,212,0.1)] to-transparent" />
      
      {colors[0] && (
        <div
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] animate-float"
          style={{ backgroundColor: colors[0], opacity }}
        />
      )}
      {colors[1] && (
        <div
          className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] animate-float-slow delay-500"
          style={{ backgroundColor: colors[1], opacity }}
        />
      )}
      {colors[2] && (
        <div
          className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full blur-[100px] animate-breathe delay-1000"
          style={{ backgroundColor: colors[2], opacity }}
        />
      )}
    </div>
  );
}
