"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { BarChart3, TrendingUp, Users, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import { GlassMetric } from "@/components/ui/glass-metric";

export default function AnalyticsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Talent Analytics</h1>
          <p className="text-aetheris-muted text-sm">Insights on hiring velocity and verification metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassMetric 
          label="Total Verified Candidates"
          value={1248}
          icon={<ShieldCheck className="w-5 h-5 text-aetheris-emerald" />}
          trend="up"
          trendValue="12%"
          animate
        />
        <GlassMetric 
          label="Time to Hire (Days)"
          value={14}
          icon={<Clock className="w-5 h-5 text-aetheris-cyan" />}
          trend="down"
          trendValue="3 days"
          animate
        />
        <GlassMetric 
          label="Offer Acceptance Rate"
          value={82}
          suffix="%"
          icon={<TrendingUp className="w-5 h-5 text-aetheris-violet" />}
          trend="up"
          trendValue="4%"
          animate
        />
        <GlassMetric 
          label="Active Pipeline"
          value={342}
          icon={<Users className="w-5 h-5 text-aetheris-blue" />}
          trend="neutral"
          trendValue="0"
          animate
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">Pipeline Velocity</h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-aetheris-muted focus:outline-none focus:border-aetheris-cyan/50">
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {/* Mock Chart */}
            {[45, 60, 35, 80, 55, 90, 75, 40, 65, 85, 50, 70].map((height, i) => (
              <div key={i} className="w-full flex flex-col items-center gap-2 group">
                <div 
                  className="w-full bg-aetheris-cyan/20 rounded-t-sm group-hover:bg-aetheris-cyan/40 transition-colors relative"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-aetheris-cyan rounded-t-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-aetheris-subtle px-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </GlassCard>

        <GlassCard padding="lg">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-aetheris-violet" />
            Top Skill Requirements
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-aetheris-muted">React / Next.js</span>
                <span className="text-white font-medium">85%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-aetheris-cyan to-aetheris-blue h-full w-[85%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-aetheris-muted">Python / PyTorch</span>
                <span className="text-white font-medium">72%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-aetheris-cyan to-aetheris-blue h-full w-[72%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-aetheris-muted">Go / Distributed Systems</span>
                <span className="text-white font-medium">64%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-aetheris-cyan to-aetheris-blue h-full w-[64%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-aetheris-muted">Rust / Systems</span>
                <span className="text-white font-medium">48%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-aetheris-cyan to-aetheris-blue h-full w-[48%] rounded-full" />
              </div>
            </div>
          </div>
          
          <button className="w-full mt-8 flex items-center justify-center gap-2 text-sm text-aetheris-cyan hover:text-white transition-colors">
            View Full Report <ArrowUpRight className="w-4 h-4" />
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
