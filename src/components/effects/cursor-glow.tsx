"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CursorGlowProps {
  className?: string;
  color?: string;
  size?: number;
  opacity?: number;
}

export function CursorGlow({
  className,
  color = "rgba(6, 182, 212, 1)", // cyan
  size = 400,
  opacity = 0.07,
}: CursorGlowProps) {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device supports hover (desktop)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const updatePosition = () => {
      // Lerp (linear interpolation) for smooth following
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      setPosition({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", onMouseMove);
    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-[1] will-change-transform rounded-full",
        className
      )}
      style={{
        width: size,
        height: size,
        left: 0,
        top: 0,
        transform: `translate(${position.x - size / 2}px, ${position.y - size / 2}px)`,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
      }}
    />
  );
}
