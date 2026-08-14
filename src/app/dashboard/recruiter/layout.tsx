"use client";

import React, { useState, useEffect } from "react";
import { Hexagon, Zap, Users, Search, Briefcase, BarChart, Settings, Bell, LayoutDashboard, LogOut, PlusCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GlassAvatar } from "@/components/ui/glass-avatar";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
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
    { name: "Dashboard", href: "/dashboard/recruiter", icon: LayoutDashboard },
    { name: "Jobs", href: "/dashboard/recruiter/post-job", icon: PlusCircle },
    { name: "Messages", href: "/dashboard/recruiter/messages", icon: MessageSquare },
    { name: "Candidates", href: "/dashboard/recruiter/jobs", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen bg-aetheris-black text-aetheris-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-72 border-r border-white/5 bg-white/[0.01] flex-col z-20">
        <div className="px-4 pt-6 pb-2">
          <Link href="/" className="flex items-center gap-3 mb-10 -ml-1">
            <img src="/logo.png" alt="Aetheris Logo" className="w-12 h-12 object-contain" />
            <span className="text-xl tracking-[0.4em] text-white font-medium">
              AETHERIS
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name}
                href={link.href} 
                className={cn(
                  "flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-colors",
                  isActive 
                    ? "bg-aetheris-violet/10 text-aetheris-violet" 
                    : "text-aetheris-muted hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="w-6 h-6" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button 
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-6 py-4 rounded-xl text-aetheris-muted hover:text-aetheris-rose hover:bg-aetheris-rose/10 text-lg font-medium transition-colors"
          >
            <LogOut className="w-6 h-6" />
            Sign Out
          </button>
          <div role="button" tabIndex={0} aria-label="User Profile" className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
            <GlassAvatar fallback={mounted && user?.firstName?.[0] ? user.firstName[0] : "R"} size="sm" ring="violet" status="online" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{mounted ? (user?.firstName || "Sarah") + " " + (user?.lastName || "Jenkins") : "Sarah Jenkins"}</div>
              <div className="text-xs text-aetheris-subtle truncate capitalize">{mounted ? (user?.role || "Employer") : "Employer"}</div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-aetheris-violet/10 blur-[120px] pointer-events-none" />



        <div className="flex-1 overflow-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
