"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield, CheckCircle2, Clock, FileText, Fingerprint, Building, GraduationCap, ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { useAppStore } from "@/lib/store";

export default function VerificationPage() {
  const { user } = useAppStore();
  const [stages, setStages] = useState([
    {
      id: "identity",
      title: "Identity Verification",
      description: "Government ID and biometric liveness check",
      status: "locked",
      icon: Fingerprint,
      date: null as string | null,
    },
    {
      id: "employment",
      title: "Employment History",
      description: "Cryptographically verified employment records",
      status: "locked",
      icon: Building,
      date: null as string | null,
    },
    {
      id: "education",
      title: "Education Credentials",
      description: "Degree and transcript verification",
      status: "locked",
      icon: GraduationCap,
      date: null as string | null,
    },
    {
      id: "resume",
      title: "Resume / CV",
      description: "Upload your latest professional resume",
      status: "locked",
      icon: FileText,
      date: null as string | null,
    }
  ]);

  const handleStartVerification = (id: string) => {
    // Set to input_required to show the form
    setStages(prev => prev.map(stage => 
      stage.id === id ? { ...stage, status: "input_required" } : stage
    ));
  };

  const handleSubmitVerification = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    // Set to pending
    setStages(prev => prev.map(stage => 
      stage.id === id ? { ...stage, status: "pending" } : stage
    ));
    
    // Simulate completion after 3 seconds
    setTimeout(() => {
      setStages(prev => prev.map(stage =>
        stage.id === id 
          ? { ...stage, status: "verified", date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) } 
          : stage
      ));
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Verification Status</h1>
          <p className="text-aetheris-muted text-sm">Manage your zero-knowledge proofs and credentials.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Trust Score</div>
            <div className="text-2xl font-display font-bold text-aetheris-muted">0/100</div>
          </div>
          <div className="w-12 h-12 rounded-full glass-sm flex items-center justify-center bg-white/5 border-white/10">
            <Shield className="w-6 h-6 text-aetheris-muted" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-4">
          {stages.filter(stage => !(stage.id === 'employment' && user?.isFresher)).map((stage) => (
            <GlassCard key={stage.id} padding="md" className="flex items-start gap-4 transition-all hover:bg-white/[0.02]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                stage.status === 'verified' ? 'bg-aetheris-emerald/10 text-aetheris-emerald' : 
                stage.status === 'pending' ? 'bg-aetheris-cyan/10 text-aetheris-cyan' : 
                'bg-white/5 text-aetheris-muted'
              }`}>
                <stage.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-white">{stage.title}</h3>
                  {stage.status === 'verified' && (
                    <span className="flex items-center gap-1 text-xs text-aetheris-emerald font-medium bg-aetheris-emerald/10 px-2 py-0.5 rounded-md">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </span>
                  )}
                  {stage.status === 'pending' && (
                    <span className="flex items-center gap-1 text-xs text-aetheris-cyan font-medium bg-aetheris-cyan/10 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </span>
                  )}
                  {stage.status === 'input_required' && (
                    <span className="flex items-center gap-1 text-xs text-aetheris-violet font-medium bg-aetheris-violet/10 px-2 py-0.5 rounded-md">
                      Action Needed
                    </span>
                  )}
                  {stage.status === 'locked' && (
                    <span className="flex items-center gap-1 text-xs text-aetheris-subtle font-medium bg-white/5 px-2 py-0.5 rounded-md">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-sm text-aetheris-muted mb-2">{stage.description}</p>
                {stage.date && (
                  <p className="text-xs text-aetheris-subtle">Completed on {stage.date}</p>
                )}
                {stage.status === 'input_required' && (
                  <form onSubmit={(e) => handleSubmitVerification(e, stage.id)} className="mt-4 space-y-3 bg-white/5 p-4 rounded-lg border border-white/5">
                    {stage.id === 'identity' && (
                      <>
                        <div>
                          <label className="block text-xs text-aetheris-muted mb-1">Aadhaar Number</label>
                          <input required type="text" placeholder="XXXX-XXXX-XXXX" className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aetheris-cyan transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs text-aetheris-muted mb-1">PAN Card Number</label>
                          <input required type="text" placeholder="ABCDE1234F" className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-aetheris-cyan transition-colors uppercase" />
                        </div>
                      </>
                    )}
                    {stage.id === 'employment' && (
                      <div>
                        <label className="block text-xs text-aetheris-muted mb-1">Upload Experience Letter</label>
                        <input required type="file" accept=".pdf,.doc,.docx" className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-aetheris-cyan/10 file:text-aetheris-cyan hover:file:bg-aetheris-cyan/20 cursor-pointer" />
                      </div>
                    )}
                    {stage.id === 'education' && (
                      <div>
                        <label className="block text-xs text-aetheris-muted mb-1">Update Credentials</label>
                        <input required type="file" accept=".pdf,.doc,.docx" className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-aetheris-cyan/10 file:text-aetheris-cyan hover:file:bg-aetheris-cyan/20 cursor-pointer" />
                      </div>
                    )}
                    {stage.id === 'resume' && (
                      <div>
                        <label className="block text-xs text-aetheris-muted mb-1">Upload your resume</label>
                        <input required type="file" accept=".pdf,.doc,.docx" className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-sm text-white file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-aetheris-cyan/10 file:text-aetheris-cyan hover:file:bg-aetheris-cyan/20 cursor-pointer" />
                      </div>
                    )}
                    <div className="pt-2">
                      <GlassButton variant="primary" size="sm" className="w-full text-xs py-2">
                        Submit Documents
                      </GlassButton>
                    </div>
                  </form>
                )}
                {stage.status === 'pending' && (
                  <div className="mt-3">
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-aetheris-cyan h-full w-2/3 rounded-full animate-pulse" />
                    </div>
                    <p className="text-xs text-aetheris-cyan mt-2">Awaiting university registrar confirmation...</p>
                  </div>
                )}
                {stage.status === 'locked' && (
                  <div className="mt-3">
                    <GlassButton 
                      variant="secondary" 
                      size="sm" 
                      className="w-auto text-xs py-1.5 px-3"
                      onClick={() => handleStartVerification(stage.id)}
                    >
                      {stage.id === 'employment' ? 'Upload Experience Letter' : 
                       stage.id === 'education' ? 'Update Credentials' : 
                       stage.id === 'resume' ? 'Upload your resume' : 
                       'Start Verification'}
                    </GlassButton>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>


      </div>
    </div>
  );
}
