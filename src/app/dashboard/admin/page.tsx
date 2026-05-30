"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield, Users, Database, Activity, AlertTriangle, ArrowUpRight } from "lucide-react";
import { GlassMetric } from "@/components/ui/glass-metric";
import { GlassButton } from "@/components/ui/glass-button";

export default function AdminDashboardPage() {
  const alerts = [
    { id: 1, type: "warning", message: "High latency detected in identity verification node (US-East)", time: "10 mins ago" },
    { id: 2, type: "danger", message: "Multiple failed authentication attempts from IP 192.168.1.45", time: "1 hour ago" },
    { id: 3, type: "info", message: "Scheduled database backup completed successfully", time: "3 hours ago" },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">System Overview</h1>
          <p className="text-aetheris-muted text-sm">AETHERIS Network global status and security metrics.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-aetheris-emerald bg-aetheris-emerald/10 border border-aetheris-emerald/20 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-aetheris-emerald animate-pulse" />
          SYSTEM OPERATIONAL
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassMetric 
          label="Total Registered Users"
          value={45289}
          icon={<Users className="w-5 h-5 text-aetheris-blue" />}
          trend="up"
          trendValue="1.2k today"
          animate
        />
        <GlassMetric 
          label="Verification Requests"
          value={12450}
          icon={<Shield className="w-5 h-5 text-aetheris-cyan" />}
          trend="up"
          trendValue="8% vs last week"
          animate
        />
        <GlassMetric 
          label="Database Load"
          value={42}
          suffix="%"
          icon={<Database className="w-5 h-5 text-aetheris-emerald" />}
          trend="neutral"
          trendValue="Stable"
          animate
        />
        <GlassMetric 
          label="API Latency (avg)"
          value={124}
          suffix="ms"
          icon={<Activity className="w-5 h-5 text-aetheris-rose" />}
          trend="down"
          trendValue="-12ms"
          animate
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Network Traffic</h3>
            <GlassButton variant="ghost" size="sm">View Detailed Logs</GlassButton>
          </div>
          
          <div className="h-64 flex items-end justify-between gap-1 px-2">
            {/* Mock Chart - Network Traffic */}
            {Array.from({ length: 48 }).map((_, i) => (
              <div role="button" tabIndex={0} aria-label={`Network traffic data point ${i}`} key={i} className="w-full bg-aetheris-rose/20 rounded-t-sm relative group cursor-pointer" style={{ height: `${Math.max(10, Math.random() * 100)}%` }}>
                <div className="absolute inset-0 bg-aetheris-rose/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-aetheris-subtle">
            <span>24h ago</span>
            <span>12h ago</span>
            <span>Now</span>
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-aetheris-rose" />
            Security Alerts
          </h3>
          
          <div className="flex-1 space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                    alert.type === 'danger' ? 'bg-aetheris-rose' :
                    alert.type === 'warning' ? 'bg-amber-400' :
                    'bg-aetheris-cyan'
                  }`} />
                  <div>
                    <p className="text-sm text-white mb-1">{alert.message}</p>
                    <p className="text-xs text-aetheris-subtle">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button aria-label="Security Command Center" className="w-full mt-6 flex items-center justify-center gap-2 text-sm text-aetheris-rose hover:text-white transition-colors">
            Security Command Center <ArrowUpRight className="w-4 h-4" />
          </button>
        </GlassCard>
      </div>
    </div>
  );
}
