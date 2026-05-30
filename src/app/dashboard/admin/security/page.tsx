"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { ShieldAlert, ShieldCheck, Lock, Key, AlertTriangle, Fingerprint } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

export default function SecurityPage() {
  const securityEvents = [
    { id: 1, type: "high", event: "Brute force attack mitigated", source: "192.168.1.45", target: "Auth Service", time: "10 mins ago" },
    { id: 2, type: "medium", event: "Unusual login location", source: "Ukraine", target: "User ID 8934", time: "1 hour ago" },
    { id: 3, type: "low", event: "API key rotation completed", source: "System", target: "Payment Gateway", time: "3 hours ago" },
    { id: 4, type: "medium", event: "Failed MFA attempt", source: "203.0.113.5", target: "Admin ID 12", time: "5 hours ago" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Network Security</h1>
          <p className="text-aetheris-muted text-sm">Monitor and manage AETHERIS platform security protocols.</p>
        </div>
        <GlassButton variant="primary" icon={<ShieldAlert className="w-4 h-4" />}>
          Run Security Scan
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard padding="lg" className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-aetheris-emerald/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-aetheris-emerald" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Firewall Status</h3>
            <p className="text-sm text-aetheris-emerald">Active & Filtering</p>
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-aetheris-cyan/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-aetheris-cyan" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Encryption</h3>
            <p className="text-sm text-aetheris-cyan">AES-256 Enabled</p>
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-aetheris-rose/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-aetheris-rose" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Threat Level</h3>
            <p className="text-sm text-aetheris-rose">Elevated</p>
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard padding="lg">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Security Events</h3>
          <div className="space-y-4">
            {securityEvents.map(event => (
              <div key={event.id} className="p-4 rounded-lg bg-white/5 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    event.type === 'high' ? 'bg-aetheris-rose shadow-[0_0_8px_rgba(244,63,94,0.8)]' :
                    event.type === 'medium' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' :
                    'bg-aetheris-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                  }`} />
                  <div>
                    <h4 className="text-white text-sm font-medium">{event.event}</h4>
                    <p className="text-xs text-aetheris-subtle mt-1">Source: {event.source} → Target: {event.target}</p>
                  </div>
                </div>
                <span className="text-xs text-aetheris-muted whitespace-nowrap">{event.time}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard padding="lg" className="flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-6">Access Control</h3>
          
          <div className="space-y-6 flex-1">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-white/5 text-aetheris-violet">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">API Keys</h4>
                  <p className="text-xs text-aetheris-muted">Manage active API integration keys</p>
                </div>
              </div>
              <GlassButton variant="secondary" size="sm">Manage</GlassButton>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-white/5 text-aetheris-emerald">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">MFA Settings</h4>
                  <p className="text-xs text-aetheris-muted">Enforce multi-factor authentication</p>
                </div>
              </div>
              <GlassButton variant="secondary" size="sm">Configure</GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
