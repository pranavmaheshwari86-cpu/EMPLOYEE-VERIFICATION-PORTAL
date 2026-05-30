"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import { TextReveal } from "../effects/text-reveal";
import { GlassCard } from "../ui/glass-card";
import { GlassBadge } from "../ui/glass-badge";
import { GlassAvatar } from "../ui/glass-avatar";
import { CheckCircle2, Code2, Globe, ShieldCheck } from "lucide-react";

export function DashboardPreviewSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <div className="container-aetheris" ref={ref}>
        <div className="max-w-4xl mx-auto text-center mb-20">
          <TextReveal as="h2" className="text-4xl md:text-5xl font-display font-bold mb-6">
            A command center for talent.
          </TextReveal>
          <p className="text-lg text-aetheris-muted">
            Experience the most powerful, visually stunning applicant tracking and talent discovery interface ever built.
          </p>
        </div>

        {/* Dashboard UI Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0, scale: 1 } : { opacity: 0, y: 40, rotateX: 10, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ perspective: "1000px" }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-aetheris-cyan via-aetheris-blue to-aetheris-violet rounded-[2rem] blur-2xl opacity-20" />
          
          <GlassCard padding="none" className="overflow-hidden border border-white/10 rounded-[2rem] shadow-2xl relative z-10 bg-aetheris-black/80">
            {/* Top Bar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-white/[0.02]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <div className="glass-sm px-4 py-1 rounded-md text-xs text-aetheris-muted flex items-center gap-2">
                <Search className="w-3 h-3" />
                aetheris.ai/candidates/alex-chen
              </div>
              <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row h-full md:h-[600px]">
              {/* Sidebar */}
              <div className="w-full md:w-64 border-r border-white/5 p-6 space-y-6 bg-white/[0.01]">
                <div className="flex items-center gap-4">
                  <GlassAvatar fallback="AC" size="lg" ring="cyan" status="online" />
                  <div>
                    <div className="font-bold text-white">Alex Chen</div>
                    <div className="text-xs text-aetheris-cyan">Sr. Staff Engineer</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <GlassBadge variant="verified" className="w-full justify-start">
                    Identity Verified
                  </GlassBadge>
                  <GlassBadge variant="premium" className="w-full justify-start">
                    Top 1% React Dev
                  </GlassBadge>
                  <GlassBadge variant="ai" className="w-full justify-start">
                    AI Evaluated
                  </GlassBadge>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="text-xs font-medium text-aetheris-muted uppercase tracking-wider">Status</div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-aetheris-subtle">Background</span>
                      <span className="text-aetheris-emerald flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Clear</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-aetheris-subtle">Code Test</span>
                      <span className="text-aetheris-emerald flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Pass</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Panel */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-display font-bold text-white">Candidate Overview</h3>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 rounded-lg glass-sm text-sm font-medium hover:bg-white/10 transition-colors">
                      Reject
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
                      Advance to Final
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <GlassCard variant="highlight" padding="sm" className="bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-2">
                      <Code2 className="w-5 h-5 text-aetheris-cyan" />
                      <div className="text-sm font-medium text-aetheris-muted">Technical Score</div>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">98.4<span className="text-sm text-aetheris-cyan ml-1">/ 100</span></div>
                  </GlassCard>
                  
                  <GlassCard variant="highlight" padding="sm" className="bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-5 h-5 text-aetheris-emerald" />
                      <div className="text-sm font-medium text-aetheris-muted">Verification</div>
                    </div>
                    <div className="text-3xl font-mono font-bold text-white">100<span className="text-sm text-aetheris-emerald ml-1">%</span></div>
                  </GlassCard>
                </div>

                <h4 className="text-sm font-medium text-aetheris-muted uppercase tracking-wider mb-4">Verified Experience</h4>
                
                <div className="space-y-4">
                  {/* Experience Item 1 */}
                  <div className="glass-sm rounded-xl p-5 border-l-2 border-l-aetheris-cyan relative">
                    <div className="absolute top-5 right-5 text-xs text-aetheris-subtle">2021 - Present</div>
                    <div className="font-bold text-white mb-1">Staff Engineer</div>
                    <div className="text-sm text-aetheris-cyan mb-4">Vercel · Full-time</div>
                    <p className="text-sm text-aetheris-muted mb-4">
                      Led the architecture and development of Next.js App Router core systems. Managed a team of 8 engineers and improved build times by 40%.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">React</span>
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">TypeScript</span>
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">Rust</span>
                    </div>
                  </div>

                  {/* Experience Item 2 */}
                  <div className="glass-sm rounded-xl p-5 border-l-2 border-l-aetheris-violet relative">
                    <div className="absolute top-5 right-5 text-xs text-aetheris-subtle">2018 - 2021</div>
                    <div className="font-bold text-white mb-1">Senior Frontend Engineer</div>
                    <div className="text-sm text-aetheris-violet mb-4">Stripe · Full-time</div>
                    <p className="text-sm text-aetheris-muted mb-4">
                      Built the new Stripe Checkout interface. Implemented core design system components used across 50+ products.
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">React</span>
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">Redux</span>
                      <span className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle">GraphQL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// Dummy icon for mockup
function Search(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
