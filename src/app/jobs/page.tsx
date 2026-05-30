"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Search, MapPin, Briefcase, DollarSign, Filter, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PUBLIC_JOBS = [
  {
    id: 1,
    title: "Senior Machine Learning Engineer",
    company: "Anthropic",
    location: "San Francisco, CA / Remote",
    salary: "$200k - $300k",
    type: "Full-time",
    verified: true,
    tags: ["AI", "PyTorch", "LLMs"],
    logo: "A"
  },
  {
    id: 2,
    title: "Staff Backend Engineer, Platform",
    company: "Scale AI",
    location: "San Francisco, CA",
    salary: "$180k - $250k",
    type: "Full-time",
    verified: true,
    tags: ["Distributed Systems", "Go", "Kubernetes"],
    logo: "S"
  },
  {
    id: 3,
    title: "Protocol Engineer",
    company: "Ethereum Foundation",
    location: "Remote Global",
    salary: "$150k - $220k",
    type: "Full-time",
    verified: true,
    tags: ["Web3", "Cryptography", "Rust"],
    logo: "E"
  },
  {
    id: 4,
    title: "Lead Product Designer",
    company: "Figma",
    location: "New York, NY",
    salary: "$160k - $210k",
    type: "Full-time",
    verified: true,
    tags: ["UX/UI", "Design Systems", "Prototyping"],
    logo: "F"
  },
  {
    id: 5,
    title: "Smart Contract Auditor",
    company: "OpenZeppelin",
    location: "Remote",
    salary: "$140k - $190k",
    type: "Contract",
    verified: true,
    tags: ["Security", "Solidity", "Auditing"],
    logo: "O"
  }
];

export default function PublicJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-aetheris-background text-white selection:bg-aetheris-cyan/30">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header & Search */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-5xl font-display font-bold">
              Find Your Next <span className="text-transparent bg-clip-text bg-gradient-to-r from-aetheris-cyan to-aetheris-violet">Verified Opportunity</span>
            </h1>
            <p className="text-aetheris-muted text-lg">
              Explore thousands of jobs from top tech companies. Only verified employers are allowed on the AETHERIS network.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-2 flex flex-col md:flex-row gap-2 mt-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative z-10 backdrop-blur-xl">
               <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                 <Search className="w-5 h-5 text-aetheris-muted" />
                 <input 
                   type="text" 
                   placeholder="Job title, keywords, or company..." 
                   className="w-full bg-transparent text-white focus:outline-none placeholder:text-white/30"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl md:border-l md:border-white/10">
                 <MapPin className="w-5 h-5 text-aetheris-muted" />
                 <input 
                   type="text" 
                   placeholder="City, state, or remote" 
                   className="w-full bg-transparent text-white focus:outline-none placeholder:text-white/30"
                 />
               </div>
               <GlassButton variant="primary" className="py-4 px-8 shrink-0">Search Jobs</GlassButton>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <span className="text-xs text-aetheris-muted flex items-center mr-2">Popular Searches:</span>
              {["Machine Learning", "Remote", "React", "Rust", "Product Manager"].map(tag => (
                <button key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1 space-y-6">
               <GlassCard padding="md" className="sticky top-24">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                     <h3 className="font-semibold text-white flex items-center gap-2"><Filter className="w-4 h-4"/> Filters</h3>
                     <button className="text-xs text-aetheris-cyan hover:underline">Clear All</button>
                  </div>

                  <div className="space-y-6">
                     <div>
                        <h4 className="text-sm font-medium text-white mb-3">Job Type</h4>
                        <div className="space-y-2">
                           {["Full-time", "Part-time", "Contract", "Internship"].map(type => (
                             <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-white/20 group-hover:border-aetheris-cyan transition-colors flex items-center justify-center">
                                   <div className="w-2 h-2 rounded-sm bg-transparent group-hover:bg-aetheris-cyan/50" />
                                </div>
                                <span className="text-sm text-aetheris-muted group-hover:text-white transition-colors">{type}</span>
                             </label>
                           ))}
                        </div>
                     </div>
                     
                     <div>
                        <h4 className="text-sm font-medium text-white mb-3">Experience Level</h4>
                        <div className="space-y-2">
                           {["Entry Level", "Mid Level", "Senior", "Director", "Executive"].map(level => (
                             <label key={level} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 rounded border border-white/20 group-hover:border-aetheris-cyan transition-colors" />
                                <span className="text-sm text-aetheris-muted group-hover:text-white transition-colors">{level}</span>
                             </label>
                           ))}
                        </div>
                     </div>

                     <div>
                        <h4 className="text-sm font-medium text-white mb-3">Salary Range</h4>
                        <input type="range" className="w-full accent-aetheris-cyan" />
                        <div className="flex justify-between text-xs text-aetheris-muted mt-2">
                           <span>$50k</span>
                           <span>$300k+</span>
                        </div>
                     </div>
                  </div>
               </GlassCard>
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center justify-between mb-2">
                 <h2 className="text-xl font-bold text-white">Recommended for you</h2>
                 <span className="text-sm text-aetheris-muted">Showing 5 of 1,204 jobs</span>
              </div>

              {PUBLIC_JOBS.map((job, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={job.id}
                >
                  <GlassCard padding="lg" className="hover:bg-white/[0.02] transition-colors group">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="w-16 h-16 rounded-2xl glass-sm flex items-center justify-center text-2xl font-bold text-white bg-white/5 border border-white/10 shrink-0">
                        {job.logo}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                          <h2 className="text-lg font-semibold text-white group-hover:text-aetheris-cyan transition-colors">
                            {job.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                             {job.verified && (
                               <span className="px-2 py-1 text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/20 flex items-center gap-1">
                                 <Zap className="w-3 h-3"/> Verified Employer
                               </span>
                             )}
                          </div>
                        </div>
                        
                        <div className="text-sm text-aetheris-muted mb-4">{job.company}</div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-xs text-aetheris-muted mb-4">
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                          <span className="flex items-center gap-1 text-emerald-400/80"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {job.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle border border-white/10">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="w-full md:w-auto mt-4 md:mt-0 shrink-0">
                        <Link href="/auth/login" className="block w-full">
                          <GlassButton variant="primary" className="w-full md:w-auto px-6 group/btn">
                            Login to Apply <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </GlassButton>
                        </Link>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}

              <div className="pt-8 text-center">
                 <GlassButton variant="secondary" className="px-8">Load More Jobs</GlassButton>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
