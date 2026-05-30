"use client";

import { Search } from "lucide-react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { MessagingDrawer } from "./MessagingDrawer";

export function TopNav() {
  return (
    <header aria-label="Top Navigation" className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 bg-[var(--color-surface-container-lowest)]/80 backdrop-blur-xl border-b border-[var(--color-glass-border)]/30">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-medium text-[var(--color-on-surface)] hidden sm:block">Command Center</h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-on-surface-variant)] group-focus-within:text-[var(--color-primary-fixed-dim)] transition-colors" />
          <input 
            type="text" 
            aria-label="Search systems"
            placeholder="Search systems..." 
            className="w-64 bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/20 rounded-full py-2 pl-10 pr-4 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:border-[var(--color-primary-fixed-dim)]/50 focus:bg-[var(--color-surface-variant)]/50 transition-all"
          />
        </div>

        {/* Messaging */}
        <MessagingDrawer />

        {/* Notifications */}
        <NotificationsDropdown />
      </div>
    </header>
  );
}
