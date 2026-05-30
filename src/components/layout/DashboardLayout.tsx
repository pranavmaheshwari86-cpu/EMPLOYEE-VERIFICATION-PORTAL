"use client";

import { Sidebar } from "./Sidebar";
import { SocketProvider } from "@/components/providers/SocketProvider";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
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
