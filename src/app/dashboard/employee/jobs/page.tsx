"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, MapPin, DollarSign, Building, Star, Clock, Briefcase, Filter, X } from "lucide-react";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";

import { JOBS_DATA } from "@/lib/jobs-data";


const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France",
  "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function JobsPage() {
  const { appliedJobs, applyForJob, user } = useAppStore();
  const [activeTab, setActiveTab] = useState("matches");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    type: "All",
    location: "All",
    skills: ""
  });

  const [savedJobs, setSavedJobs] = useState<number[]>([]);
  const [errorStates, setErrorStates] = useState<Record<string, string>>({});

  const handleApplyClick = (job: any) => {
    if (!user) {
       setErrorStates(prev => ({...prev, [job.id]: "Please complete your profile first."}));
       setTimeout(() => {
         setErrorStates(prev => { const newObj = {...prev}; delete newObj[job.id]; return newObj; });
       }, 5000);
       return;
    }

    let errorReason = [];
    const exp = user.experience || 0;
    if (exp < job.minExperience) {
       errorReason.push(`Requires ${job.minExperience}+ years of experience (You have ${exp})`);
    }

    const userTech = (user.techStack || []).map((t: string) => t.toLowerCase());
    const jobTech = (job.techStack || []).map((t: string) => t.toLowerCase());
    if (jobTech.length > 0) {
       const hasTechMatch = jobTech.some((t: string) => userTech.includes(t));
       if (!hasTechMatch) {
         errorReason.push("At least 1 tech skill must match");
       }
    }

    const userLangs = (user.languages || []).map((l: string) => l.toLowerCase());
    const jobLangs = (job.languages || []).map((l: string) => l.toLowerCase());
    if (jobLangs.length > 0) {
       const hasLangMatch = jobLangs.some((l: string) => userLangs.includes(l));
       if (!hasLangMatch) {
         errorReason.push("At least 1 language must match");
       }
    }

    if (errorReason.length > 0) {
       setErrorStates(prev => ({...prev, [job.id]: "You are not eligible for this job. Reason: " + errorReason.join(", ")}));
       setTimeout(() => {
         setErrorStates(prev => { const newObj = {...prev}; delete newObj[job.id]; return newObj; });
       }, 5000);
       return;
    }

    applyForJob(String(job.id));
  };
  const toggleSave = (id: number) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(jId => jId !== id) : [...prev, id]);
  };

  const filteredJobs = useMemo(() => {
    let result = JOBS_DATA;

    // Tab filtering
    if (activeTab === "saved") {
       result = result.filter(j => savedJobs.includes(j.id));
    } else if (activeTab === "applied") {
       result = result.filter(j => appliedJobs.includes(String(j.id)));
    }

    // Search filtering
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(q) || 
        j.company.toLowerCase().includes(q)
      );
    }

    // Filter by type
    if (filters.type !== "All") {
      if (filters.type === "Work from Home") {
        result = result.filter(j => j.location.toLowerCase().includes("remote") || j.type.toLowerCase().includes("remote") || j.type.toLowerCase().includes("home"));
      } else {
        result = result.filter(j => j.type.toLowerCase().includes(filters.type.toLowerCase()));
      }
    }

    // Filter by location
    if (filters.location !== "All") {
      if (filters.location === "Remote") {
        result = result.filter(j => j.location.toLowerCase().includes("remote"));
      } else {
        result = result.filter(j => j.location.toLowerCase().includes(filters.location.toLowerCase()));
      }
    }

    // Filter by skills (manual search)
    if (filters.skills.trim() !== "") {
      const skillsQuery = filters.skills.toLowerCase();
      result = result.filter(j => 
        j.title.toLowerCase().includes(skillsQuery) || 
        // @ts-ignore
        (j.skills && Array.isArray(j.skills) && j.skills.some(s => s.toLowerCase().includes(skillsQuery)))
      );
    }

    // --- AUTOMATIC PROFILE MATCHING ---
    if (user) {
      // 1. Experience matching
      if (user.experience !== undefined) {
        result = result.filter(j => j.minExperience <= (user.experience as number));
      }

      // 2. Tech Stack matching (at least 2 overlap, if user has tech stack)
      if (user.techStack && user.techStack.length > 0) {
        const userStackLow = user.techStack.map(t => t.toLowerCase());
        result = result.filter(j => {
          const jobStackLow = j.techStack.map(t => t.toLowerCase());
          const overlap = jobStackLow.filter(t => userStackLow.includes(t)).length;
          // If job only asks for 1 tech, let it pass if matched, otherwise require 2
          return overlap >= Math.min(2, j.techStack.length);
        });
      }

      // 3. Languages matching (at least 1 overlap, if user has languages)
      if (user.languages && user.languages.length > 0) {
        const userLangsLow = user.languages.map(l => l.toLowerCase());
        result = result.filter(j => {
          const jobLangsLow = j.languages.map(l => l.toLowerCase());
          const overlap = jobLangsLow.filter(l => userLangsLow.includes(l)).length;
          return overlap >= 1;
        });
      }
    }

    return result;
  }, [activeTab, searchQuery, filters, savedJobs, user]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-sans font-bold text-white mb-1">Job Opportunities</h1>
          <p className="text-aetheris-muted text-base">Discover roles matched to your verified skills and experience.</p>
        </div>
        <div className="w-full md:w-auto flex gap-2">
          <div className="relative flex-1 md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-aetheris-muted" />
            </div>
            <input
              type="text"
              placeholder="Search roles, companies..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-aetheris-cyan/50 focus:ring-1 focus:ring-aetheris-cyan/50 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <GlassButton variant="secondary" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(!showFilters)}>
            Filters
          </GlassButton>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <GlassCard padding="md" className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Filter Results</h3>
                <button onClick={() => setShowFilters(false)} className="text-aetheris-muted hover:text-white"><X className="w-4 h-4"/></button>
              </div>
               <div className="grid sm:grid-cols-3 gap-4">
                 <div>
                   <label className="block text-xs text-aetheris-muted mb-1">Skills</label>
                   <input 
                     type="text"
                     placeholder="e.g. React, Design"
                     className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none focus:border-aetheris-cyan/50"
                     value={filters.skills}
                     onChange={(e) => setFilters({...filters, skills: e.target.value})}
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-aetheris-muted mb-1">Job Type</label>
                   <select 
                     className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none"
                     value={filters.type}
                     onChange={(e) => setFilters({...filters, type: e.target.value})}
                   >
                     <option value="All" className="bg-aetheris-black">All Types</option>
                     <option value="Full-time" className="bg-aetheris-black">Full-time</option>
                     <option value="Part-time" className="bg-aetheris-black">Part-time</option>
                     <option value="Contract" className="bg-aetheris-black">Contract</option>
                     <option value="Work from Home" className="bg-aetheris-black">Work from Home</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-xs text-aetheris-muted mb-1">Location</label>
                   <select 
                     className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-white text-sm focus:outline-none max-h-48"
                     value={filters.location}
                     onChange={(e) => setFilters({...filters, location: e.target.value})}
                   >
                     <option value="All" className="bg-aetheris-black">Select Location...</option>
                     <optgroup label="Countries" className="bg-aetheris-black text-aetheris-muted font-semibold">
                       {COUNTRIES.map(country => (
                         <option key={country} value={country} className="bg-aetheris-black text-white">{country}</option>
                       ))}
                     </optgroup>
                   </select>
                 </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex border-b border-white/10">
        {[
          { id: "matches", label: "Top Matches" },
          { id: "saved", label: `Saved Roles (${savedJobs.length})` },
          { id: "applied", label: "Applications" }
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
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-aetheris-cyan"
              />
            )}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
           <div className="py-20 text-center">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-aetheris-muted" />
             </div>
             <h3 className="text-white font-medium mb-1">No jobs found</h3>
             <p className="text-sm text-aetheris-muted">Try adjusting your search or filters.</p>
           </div>
        ) : (
          filteredJobs.map((job) => (
            <GlassCard key={job.id} padding="lg" className="hover:bg-white/[0.02] transition-colors group">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 rounded-2xl glass-sm flex items-center justify-center text-xl font-bold text-white shrink-0 bg-white/5 border border-white/10 relative">
                  {job.logo}
                  {job.aiRecommended && (
                    <div className="absolute -top-2 -right-2 bg-aetheris-cyan text-aetheris-black p-1 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                      <Star className="w-3 h-3 fill-aetheris-black" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                         <Link href={`/dashboard/employee/jobs/${job.id}`}>
                           <h2 className="text-3xl font-semibold text-white group-hover:text-aetheris-cyan transition-colors">
                             {job.title}
                           </h2>
                         </Link>
                         {job.aiRecommended && (
                           <span className="px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-aetheris-cyan/10 text-aetheris-cyan border border-aetheris-cyan/20">
                             AI Recommended
                           </span>
                         )}
                      </div>
                      <div className="flex items-center gap-3 text-aetheris-muted mt-2">
                        <Link href={`/dashboard/employee/company/${encodeURIComponent(job.company)}`}>
                          <span className="font-bold text-white text-2xl underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors">{job.company}</span>
                        </Link>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-lg"><MapPin className="w-5 h-5" /> {job.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-aetheris-subtle flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" /> {job.posted}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-lg text-aetheris-muted">
                      <span className="font-semibold text-white">Experience Required:</span>
                      <span>{job.minExperience}+ Years</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="font-semibold text-lg text-white mr-1">Tech Stack:</span>
                      {job.techStack?.map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-md text-sm font-medium bg-aetheris-cyan/10 text-aetheris-cyan border border-aetheris-cyan/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="flex items-center gap-2 text-base text-aetheris-muted bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                      <Briefcase className="w-5 h-5 text-aetheris-violet" />
                      {job.type}
                    </div>
                    
                    <div className="ml-auto flex items-center gap-3">
                        <button 
                          onClick={() => toggleSave(job.id)}
                          className={`p-2 transition-colors rounded-lg border ${
                            savedJobs.includes(job.id) 
                              ? "text-aetheris-cyan bg-aetheris-cyan/10 border-aetheris-cyan/30" 
                              : "text-aetheris-muted hover:text-white border-transparent hover:bg-white/5"
                          }`}
                        >
                          <Star className={`w-5 h-5 ${savedJobs.includes(job.id) ? "fill-aetheris-cyan" : ""}`} />
                        </button>
                        {appliedJobs.includes(String(job.id)) ? (
                          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 text-base font-medium border border-emerald-500/20">
                            Applied
                          </div>
                        ) : (
                          <div className="flex flex-col items-end gap-2">
                            <GlassButton variant="primary" size="sm" onClick={() => handleApplyClick(job)}>
                              Apply Now
                            </GlassButton>
                            {errorStates[job.id] && (
                              <div className="text-sm text-[var(--color-error)] bg-[var(--color-error)]/10 px-3 py-1.5 rounded-lg border border-[var(--color-error)]/20 max-w-xs text-right animate-in fade-in slide-in-from-top-2">
                                {errorStates[job.id]}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
}
