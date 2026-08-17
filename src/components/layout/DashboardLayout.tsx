"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { Sidebar } from "./Sidebar";
import { SocketProvider } from "@/components/providers/SocketProvider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, hasProfile } = useAppStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (isAuthenticated && !hasProfile) {
      router.push("/auth/onboarding");
      return;
    }
  }, [isAuthenticated, hasProfile, router]);

  if (mounted && (!isAuthenticated || !hasProfile)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="animate-pulse text-sm font-medium text-gray-400">Verifying session...</div>
      </div>
    );
  }
  return (
    <SocketProvider>
      <div 
        className="relative min-h-screen text-[var(--color-on-surface)] overflow-hidden bg-[#050505]"
        style={{
          backgroundImage: `url('/bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="relative z-10 min-h-screen">
          <Sidebar />
          
          <div className="flex flex-col min-h-screen md:ml-72 transition-all relative">
            <main className="flex-1 overflow-x-hidden p-4 md:p-8 pt-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </SocketProvider>
  );
}
