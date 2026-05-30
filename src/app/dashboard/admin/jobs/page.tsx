"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Filter, Briefcase, Eye, EyeOff, ShieldAlert, CheckCircle2, AlertTriangle, MoreVertical } from "lucide-react";

const JOBS = [
  {
    id: "JOB-001",
    title: "Senior Machine Learning Engineer",
    company: "Anthropic",
    type: "Full-time",
    location: "Remote",
    salary: "$200k - $300k",
    status: "active",
    reports: 0,
    postedAt: "May 28, 2026"
  },
  {
    id: "JOB-002",
    title: "Web3 Developer",
    company: "Unknown Crypto LLC",
    type: "Contract",
    location: "Remote",
    salary: "Commission",
    status: "flagged",
    reports: 12,
    postedAt: "May 29, 2026"
  },
  {
    id: "JOB-003",
    title: "Staff Backend Engineer",
    company: "Scale AI",
    type: "Full-time",
    location: "San Francisco",
    salary: "$180k - $250k",
    status: "active",
    reports: 0,
    postedAt: "May 25, 2026"
  },
  {
    id: "JOB-004",
    title: "Data Entry Operator",
    company: "Spam Inc",
    type: "Part-time",
    location: "Remote",
    salary: "$10/hr",
    status: "removed",
    reports: 45,
    postedAt: "May 20, 2026"
  }
];

export default function AdminJobsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredJobs = JOBS.filter(j => {
    if (activeTab === "all") return true;
    return j.status === activeTab;
  });

  const getStatusBadge = (status: string, reports: number) => {
    switch (status) {
      case "active": return <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span>;
      case "flagged": return <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/20"><AlertTriangle className="w-3.5 h-3.5"/> Flagged ({reports})</span>;
      case "removed": return <span className="flex items-center gap-1 text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full border border-rose-500/20"><EyeOff className="w-3.5 h-3.5"/> Removed</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Job Postings Moderation</h1>
          <p className="text-aetheris-muted text-sm">Monitor network quality, review flagged postings, and manage platform safety.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Briefcase className="w-5 h-5 text-aetheris-cyan" /></div>
            <div>
               <div className="text-xl font-bold text-white">4,204</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Active Jobs</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><AlertTriangle className="w-5 h-5 text-amber-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">42</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Flagged Postings</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><ShieldAlert className="w-5 h-5 text-rose-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">128</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Removed (30d)</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4 bg-white/[0.02]">
           <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['all', 'active', 'flagged', 'removed'].map(tab => (
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
                  placeholder="Search jobs..." 
                  className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-aetheris-cyan w-64"
                />
              </div>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-aetheris-muted bg-white/[0.01]">
                <th className="p-4 font-medium">Job Details</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Location / Salary</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredJobs.map(job => (
                <tr key={job.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                     <div className="font-medium text-white text-sm">{job.title}</div>
                     <div className="text-xs text-aetheris-muted mt-1">{job.id} • Posted {job.postedAt}</div>
                  </td>
                  <td className="p-4 text-sm text-white/80">
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[10px] font-bold">
                        {job.company[0]}
                      </div>
                      {job.company}
                    </span>
                  </td>
                  <td className="p-4">
                     <div className="text-sm text-white">{job.location}</div>
                     <div className="text-xs text-aetheris-muted mt-1">{job.salary} • {job.type}</div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(job.status, job.reports)}
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
