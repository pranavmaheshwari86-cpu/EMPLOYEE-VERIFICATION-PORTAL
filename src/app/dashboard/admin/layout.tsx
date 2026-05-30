"use client";

import React, { useState, useEffect } from "react";
import { Hexagon, Zap, Shield, Search, Bell, Settings, Database, Activity, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlassAvatar } from "@/components/ui/glass-avatar";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const navLinks = [
    { name: "System Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Network Security", href: "/dashboard/admin/security", icon: Shield },
    { name: "Data Logs", href: "/dashboard/admin/logs", icon: Database },
    { name: "Performance", href: "/dashboard/admin/performance", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-aetheris-black text-aetheris-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-white/5 bg-white/[0.01] flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-aetheris-rose" strokeWidth={1.5} />
              <Zap className="w-3 h-3 text-aetheris-rose absolute" strokeWidth={2} />
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-white">
              AETHERIS
            </span>
          </Link>
        </div>

        <nav className="flex-1 py-6 px-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors",
                  isActive 
                    ? "bg-aetheris-rose/10 text-aetheris-rose" 
                    : "text-aetheris-muted hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-aetheris-muted hover:text-aetheris-rose hover:bg-aetheris-rose/10 font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
          <div role="button" tabIndex={0} aria-label="User Profile" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <GlassAvatar fallback={mounted && user?.firstName?.[0] ? user.firstName[0] : "A"} size="sm" ring="rose" status="online" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{mounted ? (user?.firstName || "Admin") + " " + (user?.lastName || "System") : "Admin System"}</div>
              <div className="text-xs text-aetheris-subtle truncate text-aetheris-rose">Root Access</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-aetheris-rose/10 blur-[120px] pointer-events-none" />

        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/[0.01] backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2 text-sm text-aetheris-muted">
            <span className="text-aetheris-rose font-medium">Root</span>
            <span>/</span>
            <span className="capitalize">{pathname.split('/').pop() === 'admin' ? 'System Overview' : pathname.split('/').pop()}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-aetheris-subtle absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                aria-label="Query system logs"
                placeholder="Query system logs..." 
                className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-aetheris-rose/50 focus:ring-1 focus:ring-aetheris-rose/50 w-64 transition-all"
              />
            </div>
            <button aria-label="Notifications" className="w-8 h-8 rounded-full glass-sm flex items-center justify-center text-aetheris-muted hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
            </button>
            <button aria-label="Settings" className="w-8 h-8 rounded-full glass-sm flex items-center justify-center text-aetheris-muted hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
