"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Activity, Server, Cpu, HardDrive, Network, Zap } from "lucide-react";
import { GlassMetric } from "@/components/ui/glass-metric";

export default function PerformancePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">System Performance</h1>
          <p className="text-aetheris-muted text-sm">Real-time infrastructure and application metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-aetheris-emerald bg-aetheris-emerald/10 border border-aetheris-emerald/20 px-3 py-1.5 rounded-full">
          <Activity className="w-3.5 h-3.5" />
          ALL SYSTEMS NOMINAL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassMetric 
          label="Global CPU Usage"
          value={34}
          suffix="%"
          icon={<Cpu className="w-5 h-5 text-aetheris-cyan" />}
          trend="neutral"
          trendValue="Stable"
          animate
        />
        <GlassMetric 
          label="Memory Allocation"
          value={68}
          suffix="%"
          icon={<Server className="w-5 h-5 text-aetheris-violet" />}
          trend="up"
          trendValue="2% (Warning threshold: 85%)"
          animate
        />
        <GlassMetric 
          label="Storage I/O"
          value={450}
          suffix=" MB/s"
          icon={<HardDrive className="w-5 h-5 text-aetheris-blue" />}
          trend="up"
          trendValue="+120 MB/s"
          animate
        />
        <GlassMetric 
          label="Network Throughput"
          value={1.2}
          suffix=" GB/s"
          icon={<Network className="w-5 h-5 text-aetheris-emerald" />}
          trend="down"
          trendValue="-0.1 GB/s"
          animate
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-white">API Response Times (Global)</h3>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-aetheris-cyan"><div className="w-2 h-2 rounded-full bg-aetheris-cyan" /> P95</span>
              <span className="flex items-center gap-1 text-xs text-aetheris-violet"><div className="w-2 h-2 rounded-full bg-aetheris-violet" /> P99</span>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-2 px-2 relative">
            {/* Background grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
              <div className="w-full h-px bg-white" />
            </div>

            {/* Mock Chart */}
            {[45, 50, 48, 60, 55, 42, 45, 70, 65, 50, 48, 52].map((height, i) => (
              <div key={i} className="w-full flex items-end justify-center gap-1 group relative z-10 h-full">
                {/* P95 Bar */}
                <div 
                  className="w-1/2 bg-gradient-to-t from-aetheris-cyan/20 to-aetheris-cyan/60 rounded-t-sm group-hover:from-aetheris-cyan/40 group-hover:to-aetheris-cyan/80 transition-colors"
                  style={{ height: `${height}%` }}
                />
                {/* P99 Bar */}
                <div 
                  className="w-1/2 bg-gradient-to-t from-aetheris-violet/20 to-aetheris-violet/60 rounded-t-sm group-hover:from-aetheris-violet/40 group-hover:to-aetheris-violet/80 transition-colors"
                  style={{ height: `${Math.min(100, height + 15 + Math.random() * 20)}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-aetheris-subtle px-2">
            <span>12:00</span>
            <span>12:10</span>
            <span>12:20</span>
            <span>12:30</span>
            <span>12:40</span>
            <span>12:50</span>
            <span>13:00</span>
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            Node Health Status
          </h3>
          
          <div className="space-y-4 flex-1">
            {[
              { name: "Auth Cluster (US-East)", load: 45, status: "Healthy" },
              { name: "Verification Node Alpha", load: 82, status: "Warning" },
              { name: "Database Primary", load: 60, status: "Healthy" },
              { name: "Search Indexer", load: 25, status: "Healthy" },
              { name: "Notification Worker", load: 15, status: "Healthy" },
            ].map((node, i) => (
              <div key={i} className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-white">{node.name}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                    node.status === 'Healthy' ? 'bg-aetheris-emerald/10 text-aetheris-emerald' : 'bg-amber-400/10 text-amber-400'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-black/40 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${node.load > 80 ? 'bg-amber-400' : 'bg-aetheris-cyan'}`}
                      style={{ width: `${node.load}%` }}
                    />
                  </div>
                  <span className="text-xs text-aetheris-muted w-8 text-right">{node.load}%</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
