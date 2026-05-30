"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShieldCheck, LayoutDashboard, Users, FileText, Calendar, ChevronUp, LogOut, MessageSquare, Briefcase } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useState, useEffect } from "react";

export function Sidebar() {
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

  const navItems = [
    { name: "Dashboard", href: "/dashboard/employee", icon: LayoutDashboard },
    { name: "Verification", href: "/dashboard/employee/verification", icon: Users, badge: "3" },
    { name: "Projects", href: "/dashboard/employee/projects", icon: FileText },
    { name: "Job Board", href: "/dashboard/employee/jobs", icon: Briefcase },
    { name: "Messages", href: "/dashboard/employee/messages", icon: MessageSquare },
  ];

  return (
    <aside aria-label="Sidebar Navigation" className="hidden md:block fixed inset-y-0 left-0 w-72 border-r border-white/5 bg-[#181818]/40 backdrop-blur-3xl z-40">
      <div className="flex flex-col h-full p-6">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-10 pt-4">
          <svg className="w-10 h-10 text-[#d6cdb5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 22h20L12 2z" />
            <path d="M12 2v20" />
            <path d="M6 14h12" />
            <path d="M9 8h6" />
            <path d="M2 22L12 10L22 22" />
          </svg>
          <h1 className="text-xl tracking-[0.4em] text-white font-medium pl-2">AETHERIS</h1>
        </div>

        {/* Navigation */}
        <nav aria-label="Main Navigation" className="flex-1 space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all group ${
                  isActive
                    ? "bg-[#e8d5c4]/10 text-[#e8d5c4] border border-[#e8d5c4]/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-6 h-6 ${!isActive && "group-hover:text-[#d6cdb5] transition-colors"}`} />
                <span className="font-medium text-lg">{item.name}</span>
                {item.badge && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-mono text-gray-400 group-hover:bg-[#e8d5c4]/20 group-hover:text-[#e8d5c4] transition-colors">
                    {item.badge}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile (Bottom) */}
        <div className="mt-auto pt-6 border-t border-[var(--color-glass-border)]/10 space-y-2">
          <button 
            onClick={handleLogout}
            aria-label="Sign Out"
            className="flex w-full items-center gap-4 px-6 py-4 rounded-xl text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 font-medium text-lg transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="font-medium">Sign Out</span>
          </button>
          <div 
            role="button" 
            tabIndex={0} 
            aria-label="User Profile" 
            className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/10 hover:bg-[var(--color-surface-variant)]/50 cursor-pointer transition-all"
          >
            {mounted && user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-lg border border-[var(--color-glass-border)]/20 object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-lg border border-[var(--color-glass-border)]/20 bg-[var(--color-surface-variant)]/50 flex items-center justify-center font-display text-lg font-medium text-[var(--color-on-surface)]">
                {mounted ? (user?.firstName?.charAt(0) || "A") : "A"}
              </div>
            )}
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-[var(--color-on-surface)] truncate">
                {mounted ? (user?.firstName || "Alex") + " " + (user?.lastName || "Mercer") : "Alex Mercer"}
              </p>
              <p className="text-xs text-[var(--color-on-surface-variant)] truncate">
                {mounted ? (user?.role || "ID: ATH-7742") : "ID: ATH-7742"}
              </p>
            </div>
            <ChevronUp className="w-4 h-4 text-[var(--color-on-surface-variant)]" />
          </div>
        </div>
      </div>
    </aside>
  );
}
