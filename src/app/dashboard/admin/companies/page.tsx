"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Filter, Building2, CheckCircle2, XCircle, MoreVertical, ShieldAlert, BarChart3, Clock } from "lucide-react";

const COMPANIES = [
  {
    id: "COMP-001",
    name: "Anthropic",
    industry: "AI/Research",
    plan: "Enterprise",
    status: "verified",
    jobsCount: 14,
    joined: "Mar 12, 2026",
    logo: "A"
  },
  {
    id: "COMP-002",
    name: "Scale AI",
    industry: "Technology",
    plan: "Growth",
    status: "verified",
    jobsCount: 8,
    joined: "Apr 05, 2026",
    logo: "S"
  },
  {
    id: "COMP-003",
    name: "Web3 Startup Inc",
    industry: "Blockchain",
    plan: "Startup",
    status: "pending",
    jobsCount: 1,
    joined: "May 28, 2026",
    logo: "W"
  },
  {
    id: "COMP-004",
    name: "Suspect Corp",
    industry: "Unknown",
    plan: "Free",
    status: "flagged",
    jobsCount: 0,
    joined: "May 29, 2026",
    logo: "S"
  }
];

export default function AdminCompaniesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCompanies = COMPANIES.filter(c => {
    if (activeTab === "all") return true;
    return c.status === activeTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified": return <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5"/> Verified</span>;
      case "pending": return <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20"><Clock className="w-3.5 h-3.5"/> Pending</span>;
      case "flagged": return <span className="flex items-center gap-1 text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20"><ShieldAlert className="w-3.5 h-3.5"/> Flagged</span>;
      default: return null;
    }
  };

  const getPlanBadge = (plan: string) => {
    const colors: Record<string, string> = {
      "Enterprise": "text-aetheris-violet border-aetheris-violet/30",
      "Growth": "text-aetheris-cyan border-aetheris-cyan/30",
      "Startup": "text-emerald-400 border-emerald-400/30",
      "Free": "text-aetheris-muted border-white/10"
    };
    return <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${colors[plan]}`}>{plan}</span>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Company Management</h1>
          <p className="text-aetheris-muted text-sm">Review company KYC, manage billing plans, and monitor job posting limits.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Building2 className="w-5 h-5 text-aetheris-cyan" /></div>
            <div>
               <div className="text-xl font-bold text-white">1,204</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Registered Orgs</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><BarChart3 className="w-5 h-5 text-emerald-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">$142k</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Monthly MRR</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Clock className="w-5 h-5 text-amber-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">12</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Pending KYC</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4 bg-white/[0.02]">
           <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['all', 'verified', 'pending', 'flagged'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    activeTab === tab ? 'bg-white/10 text-white shadow' : 'text-aetheris-muted hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-aetheris-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search companies..." 
                  className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-aetheris-cyan w-64"
                />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-aetheris-muted bg-white/[0.01]">
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Industry</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium text-center">Active Jobs</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredCompanies.map(company => (
                <tr key={company.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold text-white border border-white/10">
                         {company.logo}
                       </div>
                       <div>
                         <div className="font-medium text-white text-sm">{company.name}</div>
                         <div className="text-xs text-aetheris-muted">{company.id} • Joined {company.joined}</div>
                       </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/80">
                    {company.industry}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(company.status)}
                  </td>
                  <td className="p-4">
                     {getPlanBadge(company.plan)}
                  </td>
                  <td className="p-4 text-center">
                     <span className="text-sm font-medium text-white">{company.jobsCount}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1 text-aetheris-muted hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
