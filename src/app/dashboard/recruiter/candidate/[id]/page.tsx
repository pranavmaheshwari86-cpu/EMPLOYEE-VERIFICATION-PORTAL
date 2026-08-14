"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Shield, Briefcase, MapPin, Clock, Star, ExternalLink, ShieldCheck, CheckCircle2, X, FileText, Download, Award } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { MOCK_CANDIDATES, Candidate } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";

export default function CandidateDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (id) {
      const found = MOCK_CANDIDATES.find(c => c.id === Number(id));
      setCandidate(found || null);
    }
  }, [id]);

  if (!mounted) return null;

  if (!candidate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Candidate Not Found</h2>
        <p className="text-aetheris-muted mb-6">The candidate you are looking for does not exist.</p>
        <button 
          onClick={() => router.push('/dashboard/recruiter/jobs')}
          className="px-6 py-2 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 hover:bg-[#00E5FF]/20 transition-colors"
        >
          Return to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Back Button & Header Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.push('/dashboard/recruiter/jobs')}
          className="flex items-center gap-2 text-aetheris-muted hover:text-[#00E5FF] transition-colors group"
        >
          <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00E5FF]/30 group-hover:bg-[#00E5FF]/10">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Candidates</span>
        </button>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#111] border border-white/10 text-white text-sm font-medium hover:bg-white/5 transition-colors">
            <Star className="w-4 h-4 text-aetheris-muted" />
            Save Profile
          </button>
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#00b3cc] text-black text-sm font-bold hover:opacity-90 transition-opacity">
            Message
          </button>
        </div>
      </div>

      {/* Candidate Header */}
      <GlassCard className="p-8 border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#00E5FF]" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
              {candidate.name.charAt(0)}
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                {candidate.name}
                {candidate.trustScore >= 80 && (
                  <ShieldCheck className="w-6 h-6 text-[#00E5FF]" />
                )}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="text-[#00E5FF] font-medium">{candidate.role}</span>
                <span className="text-white/20">•</span>
                <span className="text-aetheris-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {candidate.location}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-aetheris-muted flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Active {candidate.lastActive}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-xs text-aetheris-muted mb-1">Trust Score</div>
            <div className="text-3xl font-display font-bold text-[#00E5FF]">
              {candidate.trustScore}
              <span className="text-sm text-aetheris-muted ml-1">/ 100</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Scrollable Content */}
      <div className="mt-12 space-y-16">
        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <User className="w-6 h-6 text-[#00E5FF]" />
            <h2 className="text-2xl font-bold text-white">Profile</h2>
          </div>
          <ProfileTab candidate={candidate} />
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Shield className="w-6 h-6 text-[#00E5FF]" />
            <h2 className="text-2xl font-bold text-white">Verification History</h2>
          </div>
          <VerificationTab candidate={candidate} />
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
            <Briefcase className="w-6 h-6 text-[#00E5FF]" />
            <h2 className="text-2xl font-bold text-white">Projects</h2>
          </div>
          <ProjectsTab candidate={candidate} />
        </section>
      </div>
    </div>
  );
}

// --- Subcomponents for Tabs ---

const Section = ({ title, icon: Icon, children }: any) => (
  <div className="border border-white/5 rounded-md bg-transparent p-6 flex flex-col mb-6">
    <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
      <Icon className="w-5 h-5 text-[#00E5FF]" />
      <h2 className="text-[15px] font-medium text-white">{title}</h2>
    </div>
    <div>{children}</div>
  </div>
);

function ProfileTab({ candidate }: { candidate: Candidate }) {
  return (
    <div className="space-y-6">
      <Section title="Introduction" icon={User}>
        <p className="text-aetheris-muted text-[14px] leading-relaxed">
          {candidate.introduction || "No introduction provided."}
        </p>
      </Section>

      <Section title="Professional Profile" icon={Briefcase}>
          <div className="space-y-6">
            <div>
              <div className="text-[12px] text-gray-400 mb-1">Experience Level</div>
              <div className="text-white text-[14px]">{candidate.experience}</div>
            </div>
            <div>
              <div className="text-[12px] text-gray-400 mb-2">Primary Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {candidate.techStack.split(', ').map(tech => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] text-gray-400 mb-2">Key Skills</div>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.split(', ').map(skill => (
                  <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-aetheris-muted border border-white/10">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[12px] text-gray-400 mb-1">Languages</div>
              <div className="text-white text-[14px]">{candidate.languages}</div>
            </div>
          </div>
        </Section>

        <Section title="Work Experience" icon={Briefcase}>
          {candidate.workExperience.length > 0 ? (
            <div className="space-y-6">
              {candidate.workExperience.map((exp, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="mt-1 w-2 h-2 rounded-full bg-[#00E5FF] shrink-0" />
                  <div>
                    <div className="text-white font-medium text-[15px]">{exp.role}</div>
                    <div className="text-aetheris-muted text-[13px] mb-1">{exp.company}</div>
                    <div className="text-white/40 text-[12px]">{exp.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-aetheris-muted text-sm text-center py-8">
              No work experience added yet.
            </div>
          )}
        </Section>

      <Section title="External Links" icon={ExternalLink}>
        <div className="flex flex-col gap-3 items-start">
          {Object.entries(candidate.urls).map(([key, value]) => {
            if (!value) return null;
            return (
              <a 
                key={key} 
                href={value} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/10 hover:bg-white/5 transition-colors text-sm text-aetheris-muted hover:text-white capitalize"
              >
                {key}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            );
          })}
        </div>
      </Section>

      <Section title="Certifications" icon={Award}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111] p-4 rounded-xl border border-white/5 flex items-start gap-4 hover:border-[#00E5FF]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center shrink-0">
               <Award className="w-5 h-5" />
            </div>
            <div>
               <div className="text-white font-medium text-sm flex items-center gap-2">
                 AWS Certified Solutions Architect
                 <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
               </div>
               <div className="text-aetheris-muted text-xs mb-1">Amazon Web Services</div>
               <div className="text-white/40 text-[10px]">Issued 2024</div>
            </div>
          </div>
          
          <div className="bg-[#111] p-4 rounded-xl border border-white/5 flex items-start gap-4 hover:border-[#00E5FF]/30 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center shrink-0">
               <Award className="w-5 h-5" />
            </div>
            <div>
               <div className="text-white font-medium text-sm flex items-center gap-2">
                 Meta Front-End Developer Professional
                 <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF]" />
               </div>
               <div className="text-aetheris-muted text-xs mb-1">Coursera / Meta</div>
               <div className="text-white/40 text-[10px]">Issued 2023</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

function VerificationTab({ candidate }: { candidate: Candidate }) {
  const [selectedStage, setSelectedStage] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidate.verificationStages.map((stage) => (
          <div key={stage.id} onClick={() => setSelectedStage(stage)} className="cursor-pointer transition-transform hover:scale-[1.02]">
            <GlassCard padding="md" className="flex items-start gap-4 border-white/5 hover:border-[#00E5FF]/30 h-full">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              stage.status === 'verified' ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 
              stage.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
              'bg-white/5 text-aetheris-muted'
            }`}>
              {stage.status === 'verified' ? <CheckCircle2 className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-medium">{stage.title}</h3>
                <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                  stage.status === 'verified' ? 'bg-[#00E5FF]/10 text-[#00E5FF]' : 
                  stage.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' : 
                  'bg-white/5 text-aetheris-muted'
                }`}>
                  {stage.status}
                </span>
              </div>
              <p className="text-sm text-aetheris-muted mb-2">
                {stage.status === 'verified' ? 'Cryptographically verified on blockchain' : 'Awaiting verification completion'}
              </p>
              {stage.date && (
                <div className="text-xs text-white/40 flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  Verified on {stage.date}
                </div>
              )}
            </div>
            </GlassCard>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedStage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#111]">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00E5FF]" />
                  {selectedStage.title} Document
                </h3>
                <button onClick={() => setSelectedStage(null)} className="p-2 text-aetheris-muted hover:text-white rounded-full hover:bg-white/5">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6">
                <div className="w-full h-96 bg-[#1a1a1a] border border-white/5 rounded-xl flex flex-col items-center justify-center text-aetheris-muted mb-6">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <p>Preview of {selectedStage.title} details...</p>
                  {selectedStage.status === 'verified' && (
                    <div className="mt-4 px-4 py-2 bg-[#00E5FF]/10 text-[#00E5FF] rounded-full text-sm font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified on Blockchain
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-3">
                  <button onClick={() => setSelectedStage(null)} className="px-5 py-2 rounded-xl text-aetheris-muted hover:text-white transition-colors">
                    Close
                  </button>
                  <button className="px-5 py-2 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] hover:bg-[#00E5FF]/20 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectsTab({ candidate }: { candidate: Candidate }) {
  if (candidate.projects.length === 0) {
    return (
      <div className="text-center py-20 border border-white/5 rounded-md bg-transparent">
        <Briefcase className="w-12 h-12 text-white/10 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No Projects Found</h3>
        <p className="text-aetheris-muted text-sm max-w-sm mx-auto">
          {candidate.name} hasn't uploaded any portfolio projects yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {candidate.projects.map((project) => (
        <GlassCard key={project.id} className="overflow-hidden border-white/5 group">
          <div className="h-48 bg-[#111] relative border-b border-white/5 flex items-center justify-center">
             <div className="text-white/20 text-sm">Project Image Placeholder</div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-medium text-white mb-2 group-hover:text-[#00E5FF] transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-aetheris-muted mb-6 leading-relaxed">
              {project.description}
            </p>
            <a 
              href={project.link} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#00E5FF] hover:underline"
            >
              View Project
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
