"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { MessageSquare } from "lucide-react";

export default function MessagesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-10">
      <GlassCard padding="xl" className="relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mb-6">
          <MessageSquare className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-2xl font-serif italic text-white mb-2">Messages</h2>
        <p className="text-aetheris-muted text-center max-w-md">
          Your inbox is currently empty. When candidates reply to your job postings or reach out to you, their messages will appear here.
        </p>
      </GlassCard>
    </div>
  );
}
