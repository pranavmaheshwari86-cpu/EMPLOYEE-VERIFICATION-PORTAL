"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Briefcase, Building, MapPin, Clock, ArrowRight, CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

const APPLICATIONS = [
  {
    id: 1,
    role: "Senior Machine Learning Engineer",
    company: "Anthropic",
    location: "San Francisco, CA / Remote",
    appliedDate: "May 26, 2026",
    status: "interview",
    logo: "A",
    stages: [
      { name: "Applied", completed: true, date: "May 26" },
      { name: "Under Review", completed: true, date: "May 27" },
      { name: "Interview", completed: false, current: true, date: "Upcoming" },
      { name: "Offer", completed: false },
    ]
  },
  {
    id: 2,
    role: "Staff Backend Engineer, Platform",
    company: "Scale AI",
    location: "San Francisco, CA",
    appliedDate: "May 20, 2026",
    status: "rejected",
    logo: "S",
    stages: [
      { name: "Applied", completed: true, date: "May 20" },
      { name: "Under Review", completed: true, date: "May 22" },
      { name: "Interview", completed: false, rejected: true, date: "May 25" },
      { name: "Offer", completed: false },
    ]
  },
  {
    id: 3,
    role: "Protocol Engineer",
    company: "Ethereum Foundation",
    location: "Remote Global",
    appliedDate: "May 28, 2026",
    status: "review",
    logo: "E",
    stages: [
      { name: "Applied", completed: true, date: "May 28" },
      { name: "Under Review", completed: false, current: true, date: "In Progress" },
      { name: "Interview", completed: false },
      { name: "Offer", completed: false },
    ]
  }
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredApps = APPLICATIONS.filter(app => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return app.status === "review" || app.status === "interview";
    if (activeTab === "closed") return app.status === "rejected" || app.status === "hired";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "review":
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">Under Review</span>;
      case "interview":
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-aetheris-cyan/10 text-aetheris-cyan border border-aetheris-cyan/20">Interviewing</span>;
      case "rejected":
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-rose-400/10 text-rose-400 border border-rose-400/20">Rejected</span>;
      case "hired":
        return <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">Offer Extended</span>;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Applications Tracker</h1>
          <p className="text-aetheris-muted text-sm">Monitor the status of your active job applications.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: "all", label: `All (${APPLICATIONS.length})` },
          { id: "active", label: "Active" },
          { id: "closed", label: "Closed" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-aetheris-cyan" : "text-aetheris-muted hover:text-white"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeAppTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-aetheris-cyan"
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredApps.length === 0 ? (
          <div className="text-center py-20">
             <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
             <p className="text-aetheris-muted">No applications found in this category.</p>
          </div>
        ) : (
          filteredApps.map((app) => (
            <GlassCard key={app.id} padding="lg">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl glass-sm flex items-center justify-center text-lg font-bold text-white bg-white/5 border border-white/10 shrink-0">
                      {app.logo}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">{app.role}</h2>
                      <div className="flex items-center gap-3 text-sm text-aetheris-muted mt-1">
                        <span className="flex items-center gap-1.5"><Building className="w-3.5 h-3.5" /> {app.company}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {app.location}</span>
                      </div>
                    </div>
                 </div>
                 <div className="flex flex-col md:items-end gap-2">
                    {getStatusBadge(app.status)}
                    <span className="text-xs text-aetheris-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Applied {app.appliedDate}
                    </span>
                 </div>
               </div>

               {/* Timeline */}
               <div className="relative pt-6">
                 {/* Connecting Line */}
                 <div className="absolute top-9 left-4 right-4 h-0.5 bg-white/5 z-0 hidden sm:block" />
                 
                 <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-6 sm:gap-0">
                   {app.stages.map((stage: any, idx) => (
                     <div key={idx} className="flex sm:flex-col items-center sm:w-1/4 gap-4 sm:gap-2">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                         stage.completed ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" :
                         stage.current ? "bg-aetheris-cyan/20 border-aetheris-cyan text-aetheris-cyan shadow-[0_0_15px_rgba(6,182,212,0.3)]" :
                         stage.rejected ? "bg-rose-500/20 border-rose-500/50 text-rose-400" :
                         "bg-aetheris-black border-white/10 text-white/20"
                       }`}>
                         {stage.completed ? <CheckCircle2 className="w-4 h-4" /> : 
                          stage.rejected ? <XCircle className="w-4 h-4" /> :
                          <span className="text-xs font-bold">{idx + 1}</span>}
                       </div>
                       
                       <div className="sm:text-center flex-1">
                         <div className={`text-sm font-medium ${
                           stage.completed || stage.current || stage.rejected ? "text-white" : "text-aetheris-muted"
                         }`}>
                           {stage.name}
                         </div>
                         {stage.date && (
                           <div className={`text-xs mt-0.5 ${
                             stage.current ? "text-aetheris-cyan" : "text-aetheris-muted/70"
                           }`}>
                             {stage.date}
                           </div>
                         )}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               
               {/* Actions */}
               <div className="mt-8 pt-6 border-t border-white/5 flex justify-end gap-3">
                  <button className="px-4 py-2 text-sm text-aetheris-muted hover:text-white transition-colors">Withdraw</button>
                  {app.status === "interview" && (
                    <button className="px-4 py-2 text-sm bg-aetheris-cyan/10 hover:bg-aetheris-cyan/20 text-aetheris-cyan border border-aetheris-cyan/30 rounded-lg transition-colors flex items-center gap-2">
                      Schedule Interview <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
               </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
