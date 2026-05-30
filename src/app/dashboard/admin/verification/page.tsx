"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield, ShieldAlert, CheckCircle2, XCircle, FileText, ChevronRight, Filter, AlertTriangle } from "lucide-react";

const QUEUE = [
  {
    id: "VER-891",
    type: "Employment",
    user: "Alex Chen",
    entity: "Scale AI",
    date: "May 29, 2026",
    aiConfidence: 98,
    status: "pending",
    flags: []
  },
  {
    id: "VER-892",
    type: "Education",
    user: "Marcus Johnson",
    entity: "Stanford University",
    date: "May 29, 2026",
    aiConfidence: 45,
    status: "flagged",
    flags: ["Date mismatch", "Institution domain unverifiable"]
  },
  {
    id: "VER-893",
    type: "Identity (KYC)",
    user: "Elena Rodriguez",
    entity: "Gov ID",
    date: "May 28, 2026",
    aiConfidence: 99,
    status: "approved",
    flags: []
  },
  {
    id: "VER-894",
    type: "Company Registration",
    user: "Web3 Startup Inc",
    entity: "Business License",
    date: "May 28, 2026",
    aiConfidence: 30,
    status: "rejected",
    flags: ["Invalid registration number", "High-risk jurisdiction"]
  }
];

export default function AdminVerificationPage() {
  const [activeTab, setActiveTab] = useState("pending");

  const filteredQueue = QUEUE.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "flagged") return item.status === "flagged";
    return item.status === activeTab;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Verification Queue</h1>
          <p className="text-aetheris-muted text-sm">Review pending verifications and AI-flagged KYC/KYB records.</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-amber-400">
            <div className="p-3 rounded-xl bg-white/5"><FileText className="w-5 h-5 text-amber-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">42</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Pending Review</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-rose-400">
            <div className="p-3 rounded-xl bg-white/5"><AlertTriangle className="w-5 h-5 text-rose-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">18</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">AI Flagged</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-emerald-400">
            <div className="p-3 rounded-xl bg-white/5"><CheckCircle2 className="w-5 h-5 text-emerald-400" /></div>
            <div>
               <div className="text-2xl font-bold text-white">8,492</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">Auto-Approved</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4 border-l-2 border-l-aetheris-cyan">
            <div className="p-3 rounded-xl bg-white/5"><Shield className="w-5 h-5 text-aetheris-cyan" /></div>
            <div>
               <div className="text-2xl font-bold text-white">99.2%</div>
               <div className="text-xs text-aetheris-muted uppercase tracking-wider">AI Accuracy</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4 bg-white/[0.02]">
           <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['pending', 'flagged', 'approved', 'rejected', 'all'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  aria-label={`Show ${tab} verifications`}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    activeTab === tab ? 'bg-white/10 text-white shadow' : 'text-aetheris-muted hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>
           
           <button aria-label="Filter verifications" className="p-1.5 bg-white/5 rounded-lg border border-white/10 text-aetheris-muted hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-white/[0.01]">
          {filteredQueue.map(item => (
             <GlassCard key={item.id} padding="md" className="flex flex-col h-full border border-white/10 hover:border-white/20 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-aetheris-cyan transition-colors">{item.type}</h3>
                    <p className="text-xs text-aetheris-muted mt-1">{item.id} • {item.date}</p>
                  </div>
                  {item.status === 'pending' && <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-[10px] uppercase font-bold rounded border border-amber-500/20">Pending</span>}
                  {item.status === 'flagged' && <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] uppercase font-bold rounded border border-rose-500/20">Flagged</span>}
                  {item.status === 'approved' && <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded border border-emerald-500/20">Approved</span>}
                  {item.status === 'rejected' && <span className="px-2 py-1 bg-white/5 text-aetheris-muted text-[10px] uppercase font-bold rounded border border-white/10">Rejected</span>}
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <div className="text-sm">
                     <span className="text-aetheris-muted block text-xs mb-0.5">User / Entity</span>
                     <span className="text-white font-medium">{item.user}</span>
                  </div>
                  <div className="text-sm">
                     <span className="text-aetheris-muted block text-xs mb-0.5">Subject</span>
                     <span className="text-white">{item.entity}</span>
                  </div>
                  
                  <div className="pt-2 border-t border-white/5">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-aetheris-muted">AI Confidence</span>
                        <span className={`text-xs font-bold ${
                           item.aiConfidence >= 90 ? 'text-emerald-400' :
                           item.aiConfidence >= 60 ? 'text-amber-400' : 'text-rose-400'
                        }`}>{item.aiConfidence}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${
                           item.aiConfidence >= 90 ? 'bg-emerald-400' :
                           item.aiConfidence >= 60 ? 'bg-amber-400' : 'bg-rose-400'
                        }`} style={{width: `${item.aiConfidence}%`}} />
                     </div>
                  </div>

                  {item.flags.length > 0 && (
                     <div className="mt-3 p-2 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                        <span className="text-[10px] uppercase font-bold text-rose-400 mb-1 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Flags</span>
                        <ul className="text-xs text-rose-300/80 list-disc list-inside">
                           {item.flags.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                     </div>
                  )}
                </div>

                <div className="flex gap-2 mt-auto pt-4 border-t border-white/5">
                  {(item.status === 'pending' || item.status === 'flagged') && (
                     <>
                        <button aria-label={`Approve ${item.id}`} className="flex-1 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium transition-colors border border-emerald-500/20">
                          Approve
                        </button>
                        <button aria-label={`Reject ${item.id}`} className="flex-1 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg text-xs font-medium transition-colors border border-rose-500/20">
                          Reject
                        </button>
                     </>
                  )}
                  <button aria-label={`View details for ${item.id}`} className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-medium transition-colors border border-white/10 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
             </GlassCard>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
