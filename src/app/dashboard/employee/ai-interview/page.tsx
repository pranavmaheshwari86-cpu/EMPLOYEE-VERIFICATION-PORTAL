"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Mic, Video, Settings, Play, Brain, Shield, ChevronRight, Activity, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AIInterviewPage() {
  const [selectedRole, setSelectedRole] = useState("ML Engineer");
  const [difficulty, setDifficulty] = useState("Hard");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">AI Interview Simulator</h1>
          <p className="text-aetheris-muted text-sm">Practice technical and behavioral interviews with our neural evaluation engine.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Left Col - Setup */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard padding="md" className="border-white/10">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
              <Settings className="w-4 h-4 text-aetheris-cyan" />
              Session Config
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-aetheris-muted mb-2">Target Role</label>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-white text-sm focus:outline-none focus:border-aetheris-cyan/50"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="ML Engineer" className="bg-aetheris-black">Machine Learning Engineer</option>
                  <option value="Backend Engineer" className="bg-aetheris-black">Backend Engineer</option>
                  <option value="Frontend Engineer" className="bg-aetheris-black">Frontend Engineer</option>
                  <option value="Product Manager" className="bg-aetheris-black">Product Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-aetheris-muted mb-2">Difficulty</label>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                  {["Easy", "Medium", "Hard"].map(level => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 text-xs py-1.5 rounded-md transition-colors ${
                        difficulty === level 
                          ? "bg-white/10 text-white font-medium shadow" 
                          : "text-aetheris-muted hover:text-white"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-aetheris-muted mb-2">Focus Area</label>
                <div className="space-y-2">
                   {["System Design", "Algorithms", "Behavioral", "Domain Specific"].map(area => (
                     <label key={area} className="flex items-center gap-2 text-sm text-white cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded border-white/20 bg-white/5 text-aetheris-cyan focus:ring-aetheris-cyan/50" />
                        {area}
                     </label>
                   ))}
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard padding="md" className="border-white/10">
             <h3 className="text-sm font-semibold text-white mb-4">Device Check</h3>
             <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                   <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <Mic className="w-4 h-4" /> Microphone
                   </div>
                   <span className="text-xs text-emerald-400 font-medium">Ready</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                   <div className="flex items-center gap-2 text-emerald-400 text-sm">
                      <Video className="w-4 h-4" /> Camera
                   </div>
                   <span className="text-xs text-emerald-400 font-medium">Ready</span>
                </div>
             </div>
          </GlassCard>
        </div>

        {/* Right Col - Main Area */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard padding="lg" className="border-aetheris-cyan/20 bg-gradient-to-br from-aetheris-cyan/5 to-transparent relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px]">
             
             {/* Abstract AI Visualization */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
               <div className="w-[300px] h-[300px] border border-aetheris-cyan/20 rounded-full animate-[spin_10s_linear_infinite]" />
               <div className="absolute w-[200px] h-[200px] border border-aetheris-cyan/40 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
               <div className="absolute w-[100px] h-[100px] border border-aetheris-cyan/60 rounded-full animate-[spin_4s_linear_infinite]" />
             </div>

             <div className="relative z-10 max-w-md mx-auto">
               <div className="w-20 h-20 mx-auto rounded-2xl glass-sm flex items-center justify-center border border-aetheris-cyan/50 mb-6 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                 <Brain className="w-10 h-10 text-aetheris-cyan" />
               </div>
               
               <h2 className="text-2xl font-bold text-white mb-2">Ready to begin?</h2>
               <p className="text-aetheris-muted mb-8 text-sm">
                 The AI will conduct a 30-minute technical interview for the <strong className="text-white">{selectedRole}</strong> position at a <strong className="text-white">{difficulty}</strong> level.
               </p>

               <GlassButton size="lg" variant="primary" className="w-full sm:w-auto" icon={<Play className="w-5 h-5 fill-current" />}>
                 Start Simulation
               </GlassButton>
             </div>
          </GlassCard>

          {/* Past Sessions */}
          <GlassCard padding="md">
             <div className="flex items-center justify-between mb-4">
               <h3 className="text-sm font-semibold text-white">Previous Sessions</h3>
               <button className="text-xs text-aetheris-cyan hover:underline">View All</button>
             </div>
             
             <div className="space-y-3">
                {[
                  { date: "May 24, 2026", role: "ML Engineer", score: 88, status: "Passed" },
                  { date: "May 20, 2026", role: "Backend Engineer", score: 92, status: "Excellent" },
                  { date: "May 15, 2026", role: "System Design", score: 74, status: "Needs Review" },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                         <Activity className="w-5 h-5 text-aetheris-muted" />
                       </div>
                       <div>
                         <h4 className="text-sm font-medium text-white group-hover:text-aetheris-cyan transition-colors">{session.role}</h4>
                         <span className="text-xs text-aetheris-muted flex items-center gap-1"><Clock className="w-3 h-3"/> {session.date}</span>
                       </div>
                     </div>
                     
                     <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">{session.score}/100</div>
                          <div className={`text-xs ${
                            session.score >= 90 ? 'text-emerald-400' : 
                            session.score >= 80 ? 'text-aetheris-cyan' : 'text-amber-400'
                          }`}>{session.status}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-aetheris-muted" />
                     </div>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>
        
      </div>
    </div>
  );
}
