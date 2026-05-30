"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { Settings, Shield, Bell, Database, Key, Server, Mail, Zap, CheckCircle2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Platform Settings</h1>
        <p className="text-aetheris-muted text-sm">Manage global configurations, security policies, and AI engine parameters.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 space-y-2 shrink-0">
          {[
            { id: "general", label: "General Config", icon: Settings },
            { id: "security", label: "Security & Auth", icon: Shield },
            { id: "ai", label: "AI Engine", icon: Zap },
            { id: "email", label: "Email Delivery", icon: Mail },
            { id: "api", label: "API Keys", icon: Key },
            { id: "system", label: "System Status", icon: Server },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                activeSection === section.id 
                  ? "bg-aetheris-cyan/10 text-aetheris-cyan border border-aetheris-cyan/20 font-medium shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                  : "text-aetheris-muted hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          <GlassCard padding="xl">
             <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
               <h2 className="text-lg font-bold text-white capitalize">{activeSection} Settings</h2>
               {isSaved && <span className="text-sm text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Saved Successfully</span>}
             </div>

             {activeSection === "general" && (
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Platform Name</label>
                   <input type="text" defaultValue="AETHERIS Network" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors" />
                 </div>
                 
                 <div className="grid md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-sm font-medium text-white mb-2">Support Email</label>
                     <input type="email" defaultValue="support@aetheris.network" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors" />
                   </div>
                   <div>
                     <label className="block text-sm font-medium text-white mb-2">Default Currency</label>
                     <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors appearance-none">
                       <option value="USD">USD ($)</option>
                       <option value="EUR">EUR (€)</option>
                       <option value="GBP">GBP (£)</option>
                     </select>
                   </div>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Maintenance Mode</label>
                   <label className="flex items-center gap-3 cursor-pointer">
                     <div className="relative">
                       <input type="checkbox" className="sr-only peer" />
                       <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                     </div>
                     <span className="text-sm text-aetheris-muted">Disable public access temporarily</span>
                   </label>
                 </div>
               </div>
             )}

             {activeSection === "ai" && (
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Primary Inference Engine</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors appearance-none">
                     <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                     <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                     <option value="claude-3-opus">Claude 3.5 Sonnet</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Matching Thresholds</label>
                   <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-aetheris-muted mb-1">
                          <span>Minimum Match Score for Recommendations</span>
                          <span>75%</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="75" className="w-full accent-aetheris-cyan" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs text-aetheris-muted mb-1">
                          <span>Resume ATS Parsing Strictness</span>
                          <span>High</span>
                        </div>
                        <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-aetheris-cyan" />
                      </div>
                   </div>
                 </div>
               </div>
             )}

             {activeSection === "security" && (
               <div className="space-y-6">
                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Two-Factor Authentication (2FA)</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors appearance-none">
                     <option value="optional">Optional for all users</option>
                     <option value="required_company">Required for Company accounts</option>
                     <option value="required_all">Required for ALL accounts</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-sm font-medium text-white mb-2">Session Timeout</label>
                   <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-aetheris-cyan transition-colors appearance-none">
                     <option value="15m">15 Minutes (Strict)</option>
                     <option value="1h">1 Hour</option>
                     <option value="24h">24 Hours (Default)</option>
                     <option value="7d">7 Days</option>
                   </select>
                 </div>
               </div>
             )}

             {/* Action Bar */}
             <div className="mt-8 pt-6 border-t border-white/10 flex justify-end gap-4">
                <GlassButton variant="secondary">Reset to Defaults</GlassButton>
                <GlassButton variant="primary" onClick={handleSave}>Save Changes</GlassButton>
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
