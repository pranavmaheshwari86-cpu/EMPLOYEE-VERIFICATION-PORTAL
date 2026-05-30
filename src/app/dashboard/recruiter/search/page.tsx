"use client";

import React, { useState, useMemo } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Filter, MapPin, Briefcase, Star, CheckCircle2, Zap, X, ChevronDown } from "lucide-react";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";

const CANDIDATES = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Senior Machine Learning Engineer",
    location: "San Francisco, CA",
    experience: "8 years",
    match: 98,
    verified: true,
    skills: ["PyTorch", "Rust", "Distributed Systems", "CUDA"],
    initials: "AC",
    aiSummary: "Top 1% candidate for ML roles. Exceptional background at Scale AI and Google. Cryptographically verified CUDA skills."
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Staff Backend Engineer",
    location: "Remote (US)",
    experience: "10 years",
    match: 92,
    verified: true,
    skills: ["Go", "Kubernetes", "gRPC", "PostgreSQL"],
    initials: "SJ",
    aiSummary: "Strong system design skills. Verified experience leading large-scale Kubernetes migrations."
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Protocol Engineer",
    location: "New York, NY",
    experience: "5 years",
    match: 85,
    verified: false,
    skills: ["Solidity", "TypeScript", "Cryptography"],
    initials: "MJ",
    aiSummary: "Good theoretical knowledge of cryptography. Lacks verified production experience."
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Data Scientist",
    location: "Austin, TX",
    experience: "4 years",
    match: 78,
    verified: true,
    skills: ["Python", "TensorFlow", "SQL", "Pandas"],
    initials: "ER",
    aiSummary: "Solid foundation in data analysis. Verified Python skills but needs more deep learning experience for senior roles."
  }
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    verifiedOnly: false,
    minMatch: 0,
    skill: ""
  });

  const filteredCandidates = useMemo(() => {
    let result = CANDIDATES;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.role.toLowerCase().includes(q) ||
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (filters.verifiedOnly) {
      result = result.filter(c => c.verified);
    }

    if (filters.minMatch > 0) {
      result = result.filter(c => c.match >= filters.minMatch);
    }

    if (filters.skill) {
      const q = filters.skill.toLowerCase();
      result = result.filter(c => c.skills.some(s => s.toLowerCase().includes(q)));
    }

    return result;
  }, [searchQuery, filters]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Intelligence Search</h1>
          <p className="text-aetheris-muted text-sm">Query the AETHERIS network for verified talent using AI.</p>
        </div>
      </div>

      <GlassCard padding="md" className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
           <div className="flex-1 w-full relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <Zap className="h-5 w-5 text-aetheris-cyan" />
             </div>
             <input
               type="text"
               placeholder="Describe your ideal candidate (e.g., 'Senior ML engineer with PyTorch and distributed systems experience')..."
               className="w-full pl-10 pr-4 py-3 bg-white/5 border border-aetheris-cyan/30 rounded-xl text-white focus:outline-none focus:border-aetheris-cyan focus:ring-1 focus:ring-aetheris-cyan transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <div className="flex gap-4 w-full md:w-auto">
             <GlassButton variant="secondary" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(!showFilters)}>
               Filters
             </GlassButton>
             <GlassButton variant="primary">
               AI Search
             </GlassButton>
           </div>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 mt-2 pt-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium text-sm">Advanced Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-aetheris-muted hover:text-white"><X className="w-4 h-4"/></button>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                 <div>
                   <label className="flex items-center gap-2 text-sm text-white cursor-pointer mt-6">
                      <input 
                        type="checkbox" 
                        checked={filters.verifiedOnly}
                        onChange={(e) => setFilters({...filters, verifiedOnly: e.target.checked})}
                        className="rounded border-white/20 bg-white/5 text-aetheris-cyan focus:ring-aetheris-cyan/50" 
                      />
                      Verified Candidates Only
                   </label>
                 </div>
                 <div>
                   <label className="block text-xs text-aetheris-muted mb-2">Minimum Match Score: {filters.minMatch}%</label>
                   <input 
                     type="range" 
                     min="0" max="100" step="5"
                     value={filters.minMatch}
                     onChange={(e) => setFilters({...filters, minMatch: parseInt(e.target.value)})}
                     className="w-full accent-aetheris-cyan"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-aetheris-muted mb-2">Required Skill</label>
                   <input 
                     type="text" 
                     placeholder="e.g. Python"
                     className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-aetheris-cyan"
                     value={filters.skill}
                     onChange={(e) => setFilters({...filters, skill: e.target.value})}
                   />
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
           <span className="text-aetheris-muted">Found {filteredCandidates.length} matches</span>
           <span className="text-aetheris-cyan flex items-center gap-1"><Zap className="w-3 h-3" /> Ranked by AI Match Score</span>
        </div>

        {filteredCandidates.length === 0 ? (
          <div className="py-20 text-center">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 border border-white/10">
                <Search className="w-6 h-6 text-aetheris-muted" />
             </div>
             <h3 className="text-white font-medium mb-1">No candidates found</h3>
             <p className="text-sm text-aetheris-muted">Try adjusting your search criteria or filters.</p>
          </div>
        ) : (
          filteredCandidates.map((candidate) => (
            <GlassCard key={candidate.id} padding="lg" className="hover:bg-white/[0.02] transition-colors group">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-16 h-16 rounded-full glass-sm flex items-center justify-center text-xl font-bold text-aetheris-violet bg-aetheris-violet/10 shrink-0 relative">
                  {candidate.initials}
                  {candidate.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-aetheris-black rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-4 h-4 text-aetheris-emerald" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <div>
                      <h2 className="text-lg font-semibold text-white group-hover:text-aetheris-cyan transition-colors">
                        {candidate.name}
                      </h2>
                      <p className="text-aetheris-muted text-sm">{candidate.role}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 mt-2 md:mt-0">
                      <span className="text-aetheris-cyan font-bold text-lg flex items-center gap-1">
                        <Star className="w-4 h-4 fill-aetheris-cyan text-aetheris-cyan" />
                        {candidate.match}%
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-aetheris-muted">AI Match Score</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {candidate.skills.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle border border-white/10">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-aetheris-muted">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {candidate.location}</span>
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {candidate.experience} experience</span>
                  </div>

                  {/* AI Insights Expansion */}
                  <AnimatePresence>
                    {expandedId === candidate.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 rounded-xl bg-aetheris-cyan/5 border border-aetheris-cyan/20">
                          <h4 className="text-xs font-semibold text-aetheris-cyan uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Zap className="w-3 h-3" /> AI Insight
                          </h4>
                          <p className="text-sm text-aetheris-white">{candidate.aiSummary}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="w-full md:w-auto flex flex-col gap-2 mt-4 md:mt-0 shrink-0">
                  <GlassButton variant="primary" size="sm" className="w-full">
                    Contact
                  </GlassButton>
                  <button 
                    onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                    className="flex items-center justify-center gap-1 w-full py-2 text-xs font-medium text-aetheris-cyan hover:bg-aetheris-cyan/10 rounded-lg transition-colors border border-transparent hover:border-aetheris-cyan/20"
                  >
                    {expandedId === candidate.id ? "Hide Insights" : "AI Insights"}
                    <ChevronDown className={`w-3 h-3 transition-transform ${expandedId === candidate.id ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
