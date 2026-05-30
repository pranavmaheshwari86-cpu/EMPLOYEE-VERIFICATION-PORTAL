"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Users, Code, Award, MapPin, Clock, Briefcase, Star, Search, Filter, X, ChevronDown } from "lucide-react";
import Link from "next/link";

import { MOCK_CANDIDATES } from "@/lib/mock-data";

export default function CandidatesPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [techStackFilter, setTechStackFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("All Types");
  const [languageFilter, setLanguageFilter] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCandidates = MOCK_CANDIDATES.filter(candidate => {
    let matchesSearch = true;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = (
        candidate.techStack.toLowerCase().includes(query) ||
        candidate.experience.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query)
      );
    }

    const matchesTech = !techStackFilter || candidate.techStack.toLowerCase().includes(techStackFilter.toLowerCase());
    const matchesExp = experienceFilter === "All Types" || candidate.experience.toLowerCase().includes(experienceFilter.toLowerCase());
    const matchesLang = !languageFilter || candidate.languages.toLowerCase().includes(languageFilter.toLowerCase());

    return matchesSearch && matchesTech && matchesExp && matchesLang;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Available Candidates</h1>
          <p className="text-aetheris-muted text-base">Browse professionals who are open to new opportunities.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-aetheris-muted" />
          <input 
            type="text" 
            placeholder="Search roles, companies..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] pl-14 pr-6 py-4 text-[15px] text-white placeholder-aetheris-muted focus:outline-none focus:border-white/20 transition-colors"
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-8 py-4 rounded-[2rem] border transition-colors shrink-0 ${showFilters ? 'bg-white/10 border-white/20 text-white' : 'bg-[#0a0a0a]/80 border-white/10 text-white hover:bg-white/5'}`}
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium text-[15px]">Filters</span>
        </button>
      </div>

      {showFilters && (
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[1.5rem] p-6 mb-8 animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-medium text-lg">Filter Results</h3>
            <button onClick={() => setShowFilters(false)} className="text-aetheris-muted hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-aetheris-muted">Tech Stack</label>
              <input 
                type="text" 
                placeholder="e.g. React, Design" 
                value={techStackFilter}
                onChange={(e) => setTechStackFilter(e.target.value)}
                className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white placeholder-aetheris-muted focus:outline-none focus:border-white/20 transition-colors"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-aetheris-muted">Experience</label>
              <div className="relative">
                <select 
                  value={experienceFilter}
                  onChange={(e) => setExperienceFilter(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white appearance-none focus:outline-none focus:border-white/20 transition-colors"
                >
                  <option value="All Types">All Types</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-3 Years">1-3 Years</option>
                  <option value="3+ Years">3+ Years</option>
                  <option value="5+ Years">5+ Years</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aetheris-muted pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-aetheris-muted">Languages Known</label>
              <div className="relative">
                <select 
                  value={languageFilter}
                  onChange={(e) => setLanguageFilter(e.target.value)}
                  className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 text-[15px] text-white appearance-none focus:outline-none focus:border-white/20 transition-colors"
                >
                  <option value="">Select Language...</option>
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-aetheris-muted pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {!mounted ? (
          <div className="text-center text-aetheris-muted py-8">Loading candidates...</div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center text-aetheris-muted py-8">No candidates match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCandidates.map((candidate) => (
              <Link key={candidate.id} href={`/dashboard/recruiter/candidate/${candidate.id}`}>
                <GlassCard className="p-6 md:p-8 hover:bg-white/[0.02] transition-colors border-white/5 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                    {/* Avatar */}
                    <div className="relative shrink-0 hidden sm:block">
                      <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                        {candidate.name.charAt(0)}
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400 flex items-center justify-center border-2 border-[#0a0a0a] shadow-sm">
                        <Star className="w-3 h-3 text-black fill-black" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-[32px] font-bold text-[#00E5FF] tracking-tight truncate">{candidate.name}</h3>
                            <span className="px-3 py-1 rounded-full text-[10px] font-medium bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 uppercase tracking-widest">
                              OPEN TO WORK
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 text-[18px]">
                            <span className="text-white font-bold underline decoration-white/30 underline-offset-4">{candidate.role}</span>
                            <span className="text-aetheris-muted">•</span>
                            <span className="text-aetheris-muted flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {candidate.location}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1.5 text-xs text-aetheris-muted shrink-0">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{candidate.lastActive}</span>
                        </div>
                      </div>

                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold text-[18px]">Experience:</span>
                          <span className="text-aetheris-muted text-[18px]">{candidate.experience}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white font-bold text-[18px] mr-1">Tech Stack:</span>
                          {candidate.techStack.split(', ').map(tech => (
                            <span key={tech} className="px-4 py-1.5 rounded-full text-[15px] font-medium bg-[#00E5FF]/5 text-[#00E5FF] border border-[#00E5FF]/20">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e1b4b]/40 border border-[#312e81]/40 w-fit">
                          <Briefcase className="w-4 h-4 text-[#818cf8]" />
                          <span className="text-xs text-[#a5b4fc] font-medium">Full-time</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <button className="text-aetheris-muted hover:text-white transition-colors" title="Save Candidate">
                            <Star className="w-5 h-5" />
                          </button>
                          <button className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white text-sm font-medium hover:opacity-90 transition-opacity">
                            Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
