"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";

export default function CompanyPortalPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden bg-transparent">
      <main className="relative z-10 w-full max-w-[500px] animate-in fade-in zoom-in duration-700">
        <GlassCard padding="xl" className="w-full liquid-glass flex flex-col items-center text-center">
          
          <div className="px-6 py-3 rounded-full bg-white/5 border border-white/20 flex items-center justify-center mb-6 gap-3">
            <img src="/logo.png" alt="Aetheris Logo" className="w-8 h-8 object-contain" />
            <span className="font-heading italic text-3xl text-white tracking-wide">Aetheris</span>
          </div>

          <h1 className="font-heading italic text-4xl text-white mb-4 text-center">Company Portal</h1>
          <p className="font-body text-[#c4c7c8] text-center mb-10 max-w-sm">Securely verify candidate histories and issue immutable employment credentials.</p>

          <div className="w-full flex flex-col gap-4">
            <GlassButton 
              onClick={() => router.push('/auth/login')}
              variant="primary"
              className="w-full py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
            >
              SIGN IN TO PORTAL <ArrowUpRight className="w-4 h-4 ml-2" />
            </GlassButton>
            <GlassButton 
              onClick={() => router.push('/auth/register?role=RECRUITER')}
              variant="secondary"
              className="w-full py-4 rounded-full border border-white/20 bg-transparent hover:bg-white/5"
            >
              CREATE NEW ORGANIZATION <ArrowUpRight className="w-4 h-4 ml-2" />
            </GlassButton>
          </div>

        </GlassCard>
      </main>
    </div>
  );
}
