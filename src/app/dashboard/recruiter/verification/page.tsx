"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Shield, CheckCircle2, XCircle, Clock, FileText, ChevronRight, Filter } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

const REQUESTS = [
  {
    id: 1,
    candidateName: "Alex Chen",
    role: "Senior ML Engineer",
    requestedDate: "May 28, 2026",
    status: "verified",
    trustScore: 98,
    details: {
      identity: true,
      employment: true,
      education: true,
      skills: true
    }
  },
  {
    id: 2,
    candidateName: "Marcus Johnson",
    role: "Protocol Engineer",
    requestedDate: "May 27, 2026",
    status: "pending",
    trustScore: null,
    details: {
      identity: true,
      employment: false,
      education: false,
      skills: false
    }
  },
  {
    id: 3,
    candidateName: "Elena Rodriguez",
    role: "Data Scientist",
    requestedDate: "May 25, 2026",
    status: "flagged",
    trustScore: 45,
    details: {
      identity: true,
      employment: false, // Flagged
      education: true,
      skills: true
    }
  }
];

export default function VerificationRequestsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredRequests = REQUESTS.filter(req => {
    if (activeTab === "all") return true;
    return req.status === activeTab;
  });

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'verified':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium"><CheckCircle2 className="w-3.5 h-3.5"/> Verified</span>;
      case 'pending':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium"><Clock className="w-3.5 h-3.5"/> Processing</span>;
      case 'flagged':
        return <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-medium"><XCircle className="w-3.5 h-3.5"/> Action Needed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Verification Requests</h1>
          <p className="text-aetheris-muted text-sm">Monitor the background and skill verification status of your pipeline.</p>
        </div>
        <GlassButton variant="primary" icon={<Shield className="w-4 h-4" />}>
          Request Verification
        </GlassButton>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-aetheris-cyan">
            <div className="p-3 rounded-xl bg-white/5"><FileText className="w-5 h-5 text-aetheris-cyan" /></div>
            <div>
               <div className="text-2xl font-bold text-white">124</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Total Requests</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-emerald-400">
            <div className="p-3 rounded-xl bg-white/5"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">98</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Verified</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-amber-400">
            <div className="p-3 rounded-xl bg-white/5"><Clock className="w-5 h-5 text-amber-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">24</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Processing</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-rose-400">
            <div className="p-3 rounded-xl bg-white/5"><XCircle className="w-5 h-5 text-rose-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">2</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Flagged</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4">
           <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'all' ? 'bg-white/10 text-white' : 'text-aetheris-muted hover:bg-white/5'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('verified')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'verified' ? 'bg-emerald-500/20 text-emerald-400' : 'text-aetheris-muted hover:bg-white/5'}`}
              >
                Verified
              </button>
              <button 
                onClick={() => setActiveTab('pending')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'pending' ? 'bg-cyan-500/20 text-cyan-400' : 'text-aetheris-muted hover:bg-white/5'}`}
              >
                Processing
              </button>
              <button 
                onClick={() => setActiveTab('flagged')}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${activeTab === 'flagged' ? 'bg-rose-500/20 text-rose-400' : 'text-aetheris-muted hover:bg-white/5'}`}
              >
                Flagged
              </button>
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-aetheris-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-aetheris-cyan"
                />
              </div>
              <button className="p-2 bg-white/5 rounded-lg border border-white/10 text-aetheris-muted hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-aetheris-muted bg-white/5">
                <th className="p-4 font-medium">Candidate</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">AETHERIS Trust Score</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredRequests.map(req => (
                <tr key={req.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white">
                         {req.candidateName.split(' ').map(n=>n[0]).join('')}
                       </div>
                       <div>
                         <div className="font-medium text-white">{req.candidateName}</div>
                         <div className="text-xs text-aetheris-muted">Req: {req.requestedDate}</div>
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-white/80">{req.role}</div>
                  </td>
                  <td className="p-4">
                    {getStatusDisplay(req.status)}
                  </td>
                  <td className="p-4">
                    {req.trustScore ? (
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-bold ${
                          req.trustScore >= 90 ? 'text-emerald-400' :
                          req.trustScore >= 70 ? 'text-aetheris-cyan' : 'text-rose-400'
                        }`}>
                          {req.trustScore}
                        </span>
                        <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${
                            req.trustScore >= 90 ? 'bg-emerald-400' :
                            req.trustScore >= 70 ? 'bg-aetheris-cyan' : 'bg-rose-400'
                          }`} style={{width: `${req.trustScore}%`}} />
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-aetheris-muted italic">Calculating...</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button className="inline-flex items-center justify-center p-2 text-aetheris-muted hover:text-aetheris-cyan hover:bg-aetheris-cyan/10 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredRequests.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-aetheris-muted">
                    No verification requests found matching this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
