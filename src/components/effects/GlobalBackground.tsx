"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SpaceBackground } from "./SpaceBackground";

export function GlobalBackground() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering anything until mounted
  if (!mounted) return <div className="fixed inset-0 w-full h-full bg-[#0a0a0c] z-0" />;

  // Exclude the landing page
  if (pathname === "/") {
    return null;
  }

  return <SpaceBackground />;
}
