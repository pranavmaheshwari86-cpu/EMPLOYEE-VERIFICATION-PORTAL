"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Database, Filter, Download, Search, Terminal } from "lucide-react";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";

export default function LogsPage() {
  const logs = [
    { id: "LOG-001", timestamp: "2026-05-29 11:15:22", level: "INFO", source: "AuthService", message: "User logged in successfully: u_8934" },
    { id: "LOG-002", timestamp: "2026-05-29 11:15:18", level: "WARN", source: "VerificationAPI", message: "Document validation timeout (retry 1/3)" },
    { id: "LOG-003", timestamp: "2026-05-29 11:14:50", level: "ERROR", source: "Database", message: "Connection pool exhausted (max: 100)" },
    { id: "LOG-004", timestamp: "2026-05-29 11:12:05", level: "INFO", source: "NotificationWorker", message: "Processed 450 emails in batch job" },
    { id: "LOG-005", timestamp: "2026-05-29 11:10:00", level: "INFO", source: "System", message: "Scheduled health check: PASS" },
    { id: "LOG-006", timestamp: "2026-05-29 11:08:42", level: "WARN", source: "FrontendAPI", message: "Rate limit threshold reached for IP 192.168.1.100" },
    { id: "LOG-007", timestamp: "2026-05-29 11:05:11", level: "INFO", source: "AuthService", message: "New user registered: u_8935" },
    { id: "LOG-008", timestamp: "2026-05-29 11:01:23", level: "ERROR", source: "SearchService", message: "ElasticSearch node unresponsive" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">System Logs</h1>
          <p className="text-aetheris-muted text-sm">Real-time audit trail and application logs.</p>
        </div>
        <div className="flex gap-3">
          <GlassButton variant="secondary" icon={<Filter className="w-4 h-4" />}>
            Filter
          </GlassButton>
          <GlassButton variant="secondary" icon={<Download className="w-4 h-4" />}>
            Export
          </GlassButton>
        </div>
      </div>

      <GlassCard padding="lg" className="flex flex-col md:flex-row gap-4 items-center shrink-0">
        <div className="flex-1 w-full">
          <GlassInput
            label="Search logs via standard query or regex..."
            icon={Search}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-aetheris-cyan/50 h-[46px]">
            <option>All Levels</option>
            <option>INFO</option>
            <option>WARN</option>
            <option>ERROR</option>
            <option>DEBUG</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-aetheris-cyan/50 h-[46px]">
            <option>All Sources</option>
            <option>AuthService</option>
            <option>Database</option>
            <option>FrontendAPI</option>
          </select>
        </div>
      </GlassCard>

      <GlassCard className="flex-1 overflow-hidden flex flex-col min-h-[400px]">
        <div className="bg-black/40 border-b border-white/10 p-3 flex items-center gap-2 font-mono text-xs text-aetheris-muted shrink-0">
          <Terminal className="w-4 h-4" />
          <span>tail -f /var/log/aetheris/system.log</span>
        </div>
        
        <div className="flex-1 overflow-auto p-4 custom-scrollbar font-mono text-sm space-y-1">
          {logs.map((log, index) => (
            <div key={index} className="flex items-start gap-4 hover:bg-white/5 px-2 py-1.5 rounded transition-colors group">
              <span className="text-aetheris-subtle shrink-0">{log.timestamp}</span>
              <span className={`shrink-0 w-16 ${
                log.level === 'INFO' ? 'text-aetheris-cyan' :
                log.level === 'WARN' ? 'text-amber-400' :
                log.level === 'ERROR' ? 'text-aetheris-rose' : 'text-white'
              }`}>
                [{log.level}]
              </span>
              <span className="text-aetheris-violet shrink-0 w-32 truncate">{log.source}:</span>
              <span className="text-white group-hover:text-white/90 break-words">{log.message}</span>
            </div>
          ))}
          {/* Simulated loading / tailing effect */}
          <div className="flex items-center gap-2 px-2 py-2 text-aetheris-subtle animate-pulse">
            <span className="w-2 h-4 bg-aetheris-cyan inline-block animate-pulse" />
            Waiting for new logs...
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
