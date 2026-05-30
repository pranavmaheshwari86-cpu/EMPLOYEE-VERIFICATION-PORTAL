"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText, Download, Share2, Sparkles, CheckCircle2, ChevronRight, UploadCloud, AlertCircle, TrendingUp, Zap } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { motion } from "framer-motion";

export default function ResumePage() {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">AETHERIS Resume</h1>
          <p className="text-aetheris-muted text-sm">Your AI-generated, cryptographically verified living resume.</p>
        </div>
        <div className="flex gap-3">
          <GlassButton variant="secondary" icon={<Share2 className="w-4 h-4" />}>
            Share Link
          </GlassButton>
          <GlassButton variant="primary" icon={<Download className="w-4 h-4" />}>
            Export PDF
          </GlassButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Resume Preview */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard padding="lg" className="bg-white/[0.01] border-white/10 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-aetheris-cyan/10 blur-[50px] pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Alex Chen</h2>
                <p className="text-aetheris-cyan font-medium">Senior Machine Learning Engineer</p>
                <div className="flex gap-4 mt-4 text-sm text-aetheris-muted">
                  <span>San Francisco, CA</span>
                  <span>alex.chen@example.com</span>
                  <span>github.com/alexchen</span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-aetheris-emerald/10 border border-aetheris-emerald/20 text-aetheris-emerald text-xs font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  AETHERIS Verified
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-aetheris-cyan" />
                  AI Summary
                </h3>
                <p className="text-sm text-aetheris-muted leading-relaxed">
                  Engineered distributed machine learning pipelines handling 5PB+ of daily data. Expert in optimizing transformer architectures for edge deployment. Proven track record of leading cross-functional teams to deliver mission-critical AI systems 20% ahead of schedule.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Experience</h3>
                <div className="space-y-6">
                  <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-aetheris-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-medium">Senior ML Engineer</h4>
                      <span className="text-sm text-aetheris-muted">2023 - Present</span>
                    </div>
                    <div className="text-aetheris-cyan text-sm mb-3">Scale AI</div>
                    <ul className="space-y-2 text-sm text-aetheris-muted list-disc list-inside">
                      <li>Architected federated learning system improving model accuracy by 14%.</li>
                      <li>Reduced inference latency by 45% using TensorRT and custom CUDA kernels.</li>
                      <li>Led a team of 4 engineers to migrate legacy CV pipelines to a scalable PyTorch backend.</li>
                    </ul>
                  </div>
                  
                  <div className="relative pl-4 border-l border-white/10">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-white/20" />
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-white font-medium">Software Engineer, AI Core</h4>
                      <span className="text-sm text-aetheris-muted">2020 - 2023</span>
                    </div>
                    <div className="text-aetheris-cyan text-sm mb-3">Google</div>
                    <ul className="space-y-2 text-sm text-aetheris-muted list-disc list-inside">
                      <li>Developed distributed data processing pipelines using Apache Beam.</li>
                      <li>Co-authored 2 patents on efficient neural network quantization.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Python", "PyTorch", "TensorFlow", "CUDA", "C++", "Distributed Systems", "Kubernetes", "AWS"].map(skill => (
                    <span key={skill} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-aetheris-muted">{skill}</span>
                  ))}
                </div>
              </section>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: AI Analyzer & Upload */}
        <div className="space-y-6">
          
          {/* AI ATS Analyzer Panel */}
          <GlassCard padding="md" className="border-aetheris-cyan/20 bg-gradient-to-b from-aetheris-cyan/5 to-transparent relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-aetheris-cyan/20 blur-[50px] pointer-events-none" />
             
             <div className="flex items-center gap-2 mb-6 relative z-10">
               <Zap className="w-5 h-5 text-aetheris-cyan" />
               <h3 className="text-lg font-semibold text-white">AI ATS Analyzer</h3>
             </div>

             <div className="flex items-center justify-center mb-6 relative z-10">
                <div className="relative flex items-center justify-center w-32 h-32">
                   <svg className="w-full h-full transform -rotate-90">
                     <circle cx="64" cy="64" r="56" className="stroke-white/10 fill-none stroke-[8]" />
                     <motion.circle 
                       cx="64" cy="64" r="56" 
                       className="stroke-aetheris-cyan fill-none stroke-[8] drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
                       strokeDasharray="351" 
                       initial={{ strokeDashoffset: 351 }}
                       animate={{ strokeDashoffset: 351 - (351 * 88) / 100 }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       strokeLinecap="round"
                     />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                      <span className="text-3xl font-bold text-white">88</span>
                      <span className="text-xs text-aetheris-muted uppercase tracking-wider">Score</span>
                   </div>
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="text-sm font-medium text-white">Strong Impact Metrics</h4>
                     <p className="text-xs text-aetheris-muted">You quantified results in 85% of your bullets (e.g. "by 14%").</p>
                   </div>
                </div>
                
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
                   <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                   <div>
                     <h4 className="text-sm font-medium text-white">Missing Keywords</h4>
                     <p className="text-xs text-aetheris-muted">Add 'LLMs' or 'Generative AI' to align with current ML Engineer market trends.</p>
                   </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/5 flex items-start gap-3">
                   <TrendingUp className="w-5 h-5 text-aetheris-cyan shrink-0 mt-0.5" />
                   <div>
                     <h4 className="text-sm font-medium text-white">Action Verb Variety</h4>
                     <p className="text-xs text-aetheris-muted">Good variety. Try replacing "Worked on" with "Engineered" or "Developed".</p>
                   </div>
                </div>
             </div>

             <GlassButton variant="primary" className="w-full mt-6" icon={<Sparkles className="w-4 h-4" />}>
               Auto-Fix Resume
             </GlassButton>
          </GlassCard>

          {/* Upload New Resume */}
          <GlassCard padding="md" className="border-dashed border-2 border-white/10 hover:border-aetheris-cyan/50 transition-colors group cursor-pointer text-center">
            <div className="py-8 flex flex-col items-center justify-center">
               <div className="w-12 h-12 rounded-full glass-sm flex items-center justify-center text-aetheris-muted group-hover:text-aetheris-cyan transition-colors mb-4">
                 <UploadCloud className="w-6 h-6" />
               </div>
               <h3 className="text-sm font-medium text-white mb-1">Upload Existing Resume</h3>
               <p className="text-xs text-aetheris-muted mb-4 max-w-[200px]">PDF or Word document up to 5MB. Our AI will parse and reconstruct it.</p>
               <GlassButton variant="secondary" size="sm">Select File</GlassButton>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}
