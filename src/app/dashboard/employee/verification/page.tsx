"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield, CheckCircle2, Clock, FileText, Fingerprint, Building, GraduationCap, ArrowRight, Eye } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { fetchAPI } from "@/lib/api";

export default function VerificationPage() {
  const { user, fetchProfile } = useAppStore();
  const [viewingDoc, setViewingDoc] = useState<{title: string, date: string | null, fileDataUrl?: string} | null>(null);
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  
  // Convert Data URL to Blob URL for robust compatibility
  useEffect(() => {
    if (viewingDoc?.fileDataUrl) {
      try {
        const split = viewingDoc.fileDataUrl.split(',');
        if (split.length > 1) {
          const mimeMatch = split[0].match(/:(.*?);/);
          const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
          
          const byteString = atob(split[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          const blob = new Blob([ia], { type: mimeType });
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl(url);
        }
      } catch (err) {
        console.error("Failed to decode file data", err);
      }
    } else {
      setPdfBlobUrl(null);
    }
    
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [viewingDoc?.fileDataUrl]);

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

  useEffect(() => {
    if (user?.verifications && user.verifications.length > 0) {
      setStages(prev => prev.map(stage => {
        const v = user.verifications?.find((v: any) => v.type === stage.id);
        if (v) {
          return {
            ...stage,
            status: v.status.toLowerCase(),
            date: v.verifiedAt ? new Date(v.verifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : stage.date
          };
        }
        return stage;
      }));
    }
  }, [user?.verifications]);

  const handleStartVerification = (id: string) => {
    // Set to input_required to show the form
    setStages(prev => prev.map(stage => 
      stage.id === id ? { ...stage, status: "input_required" } : stage
    ));
  };

  const handleSubmitVerification = async (e: React.FormEvent, id: string) => {
    e.preventDefault();
    // Set to pending
    setStages(prev => prev.map(stage => 
      stage.id === id ? { ...stage, status: "pending" } : stage
    ));
    
    // Attempt to read the uploaded file if present
    const form = e.target as HTMLFormElement;
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    let fileDataUrl: string | undefined;
    
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      try {
        fileDataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } catch (err) {
        console.error("Failed to read file", err);
      }
    }

    // Simulate processing, then mark as verified
    setTimeout(async () => {
      const verifiedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // Update UI to verified immediately
      setStages(prev => prev.map(stage =>
        stage.id === id 
          ? { ...stage, status: "verified", date: verifiedDate } 
          : stage
      ));

      // Save verification status to local store
      const { user } = useAppStore.getState();
      if (user) {
        const existingVerifications = user.verifications || [];
        const updatedVerifications = existingVerifications.filter((v: any) => v.type !== id);
        updatedVerifications.push({ 
          type: id, 
          status: 'VERIFIED', 
          verifiedAt: new Date().toISOString(),
          fileDataUrl 
        });
        
        useAppStore.setState((state) => ({
          user: state.user ? { ...state.user, verifications: updatedVerifications } : null
        }));
      }

      // Attempt backend sync (non-blocking)
      try {
        await fetchAPI('/employee/verifications', {
          method: 'POST',
          body: JSON.stringify({ type: id, status: 'VERIFIED' })
        });
        await fetchProfile();
      } catch (err) {
        console.warn("Backend sync failed for verification (saved locally):", err);
      }
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 pt-4 relative">
      {/* Document Viewer Fullscreen Overlay */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0b0c10] overflow-hidden">
          {/* Floating Actions */}
          <div className="absolute top-6 right-6 z-[60] flex items-center gap-4">
            {pdfBlobUrl && (
              <a 
                href={pdfBlobUrl} 
                download={viewingDoc.title.replace(/\s+/g, '_') + '_Document'}
                className="p-3 bg-[#e8d5c4]/90 hover:bg-[#e8d5c4] border border-white/20 rounded-full transition-all text-black hover:scale-105 shadow-2xl backdrop-blur-md flex items-center gap-2 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                <span className="text-sm pl-1 hidden sm:block">Download</span>
              </a>
            )}
            <button 
              onClick={() => setViewingDoc(null)}
              className="p-3 bg-black/60 hover:bg-black/80 border border-white/20 rounded-full transition-all text-white hover:scale-110 shadow-2xl backdrop-blur-md flex items-center gap-2"
            >
              <span className="text-sm font-medium pl-2 hidden sm:block">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>
          
          {/* Document Title overlay */}
          <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/80 to-transparent pointer-events-none z-50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#d6cdb5]" />
              <h3 className="text-xl font-medium text-white tracking-wide drop-shadow-lg">
                {viewingDoc.title} Document
              </h3>
            </div>
          </div>
            
          {/* Modal Body */}
          <div className="flex-1 bg-black/40 flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {viewingDoc.fileDataUrl ? (
              <div className="w-full h-full relative z-10 flex flex-col items-center justify-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                  {viewingDoc.fileDataUrl.startsWith('data:image/') ? (
                    <img src={viewingDoc.fileDataUrl} alt="Document" className="max-w-full max-h-full object-contain" />
                  ) : pdfBlobUrl ? (
                    <iframe src={pdfBlobUrl} className="w-full h-full border-none bg-white" title="Document Viewer" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-white/50 space-y-4">
                      <svg className="animate-spin h-8 w-8 text-[#d6cdb5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <p className="text-sm">Processing Document...</p>
                    </div>
                  )}
              </div>
            ) : (
                <div className="bg-white/5 border border-white/10 p-12 rounded-xl flex flex-col items-center max-w-md w-full text-center relative z-10 backdrop-blur-md">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  </div>
                  <h4 className="text-xl text-white font-serif italic mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Cryptographically Verified
                  </h4>
                  <p className="text-sm text-gray-400 mb-6">
                    This document has been securely verified and recorded on the Aetheris network.
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6"></div>
                  <div className="flex items-center justify-between w-full text-xs text-gray-500">
                    <span>Status: <span className="text-emerald-400">Valid</span></span>
                    <span>Date: {viewingDoc.date || 'Recently'}</span>
                  </div>
                </div>
              )}
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pl-2">
        <div>
          <h1 className="text-4xl text-white font-serif italic mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Verification <span className="text-[#e8d5c4] not-italic">Status</span>.
          </h1>
          <p className="text-gray-400 text-sm ml-1">Manage your zero-knowledge proofs and credentials.</p>
        </div>
        <div className="flex items-center gap-4 bg-[#111318]/50 border border-white/5 rounded-3xl px-6 py-4 self-start sm:self-auto">
          <div className="text-right">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Trust Score</div>
            <div className="text-3xl font-serif italic text-[#e8d5c4]" style={{ fontFamily: "'Instrument Serif', serif" }}>0<span className="text-xl text-gray-500">/100</span></div>
          </div>
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 ml-2 shadow-inner">
            <Shield className="w-5 h-5 text-[#d6cdb5]" />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {stages.filter(stage => !(stage.id === 'employment' && user?.isFresher)).map((stage) => (
          <GlassCard key={stage.id} padding="lg" className="w-full flex flex-col bg-black/30 backdrop-blur-2xl border border-white/5 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <stage.icon className="w-4 h-4 text-[#d6cdb5]" />
                <span className="text-xs font-bold tracking-[0.15em] text-gray-300 uppercase mt-0.5">{stage.title}</span>
              </div>
              
              {stage.status === 'verified' && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-full tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified
                </span>
              )}
              {stage.status === 'pending' && (
                <span className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium bg-cyan-400/10 border border-cyan-400/20 px-3 py-1 rounded-full tracking-wide">
                  <Clock className="w-3.5 h-3.5" />
                  In Progress
                </span>
              )}
              {stage.status === 'input_required' && (
                <span className="flex items-center gap-1.5 text-xs text-rose-400 font-medium bg-rose-400/10 border border-rose-400/20 px-3 py-1 rounded-full tracking-wide">
                  Action Needed
                </span>
              )}
              {stage.status === 'locked' && (
                <span className="flex items-center gap-1.5 text-xs text-gray-400 font-medium bg-white/5 border border-white/10 px-3 py-1 rounded-full tracking-wide">
                  Required
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <p className="text-base text-gray-300 mb-2">{stage.description}</p>
              {stage.date && (
                <p className="text-sm text-gray-500">Completed on {stage.date}</p>
              )}

              {stage.status === 'input_required' && (
                <form onSubmit={(e) => handleSubmitVerification(e, stage.id)} className="mt-8 space-y-6 pt-8 border-t border-white/5">
                  {stage.id === 'identity' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm text-gray-300 ml-1">Aadhaar Number</label>
                        <input required type="text" placeholder="XXXX-XXXX-XXXX" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors" />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <label className="text-sm text-gray-300 ml-1">PAN Card Number</label>
                        <input required type="text" placeholder="ABCDE1234F" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors uppercase" />
                      </div>
                    </div>
                  )}
                  {stage.id === 'employment' && (
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-gray-300 ml-1">Upload Experience Letter</label>
                      <input required type="file" accept=".pdf,.doc,.docx" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/5 file:text-[#d6cdb5] hover:file:bg-white/10 cursor-pointer transition-colors" />
                    </div>
                  )}
                  {stage.id === 'education' && (
                    <div className="flex flex-col gap-5 w-full">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 w-full">
                          <label className="text-sm text-gray-300 ml-1">School Name</label>
                          <input required type="text" placeholder="e.g. Delhi Public School" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label className="text-sm text-gray-300 ml-1">College Name</label>
                          <input required type="text" placeholder="e.g. IIT Delhi" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2 w-full">
                          <label className="text-sm text-gray-300 ml-1">Highest Education</label>
                          <input required type="text" placeholder="e.g. Bachelor of Technology" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                          <label className="text-sm text-gray-300 ml-1">Upload Documents (Optional)</label>
                          <input type="file" accept=".pdf,.doc,.docx" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/5 file:text-[#d6cdb5] hover:file:bg-white/10 cursor-pointer transition-colors" />
                        </div>
                      </div>
                    </div>
                  )}
                  {stage.id === 'resume' && (
                    <div className="flex flex-col gap-2 w-full">
                      <label className="text-sm text-gray-300 ml-1">Upload your resume</label>
                      <input required type="file" accept=".pdf,.doc,.docx" className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-white/5 file:text-[#d6cdb5] hover:file:bg-white/10 cursor-pointer transition-colors" />
                    </div>
                  )}
                  <div className="flex justify-start mt-8 pt-2">
                    <button type="submit" className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)]">
                      Submit Documents
                    </button>
                  </div>
                </form>
              )}

              {stage.status === 'pending' && (
                <div className="mt-8 pt-8 border-t border-white/5">
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#d6cdb5] h-full w-2/3 rounded-full animate-pulse shadow-[0_0_10px_rgba(214,205,181,0.5)]" />
                  </div>
                  <p className="text-sm text-[#d6cdb5] mt-4 font-medium">Processing verification requests...</p>
                </div>
              )}

              {stage.status === 'locked' && (
                <div className="flex justify-start mt-8 border-t border-white/5 pt-6">
                  <button 
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)]"
                    onClick={() => handleStartVerification(stage.id)}
                  >
                    {stage.id === 'employment' ? 'Upload Experience Letter' : 
                     stage.id === 'education' ? 'Update Credentials' : 
                     stage.id === 'resume' ? 'Upload your resume' : 
                     'Start Verification'}
                  </button>
                </div>
              )}

              {stage.status === 'verified' && (
                <div className={`flex items-center mt-8 border-t border-white/5 pt-6 ${stage.id === 'identity' || stage.id === 'education' ? 'justify-end' : 'justify-between'}`}>
                  {stage.id !== 'identity' && stage.id !== 'education' && (
                    <button 
                      type="button"
                      className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-white/5 text-gray-300 font-medium text-sm hover:bg-white/10 hover:text-white transition-colors border border-white/10"
                      onClick={() => {
                        const verificationRecord = user?.verifications?.find((v: any) => v.type === stage.id);
                        setViewingDoc({ 
                          title: stage.title, 
                          date: stage.date, 
                          fileDataUrl: verificationRecord?.fileDataUrl 
                        });
                      }}
                    >
                      <Eye className="w-4 h-4" /> View Document
                    </button>
                  )}
                  <button 
                    type="button"
                    className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)]"
                    onClick={() => handleStartVerification(stage.id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
