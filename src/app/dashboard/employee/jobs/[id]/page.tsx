"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Briefcase, Star, CheckCircle2, ExternalLink, Globe, MessageCircle, Users, ArrowRight, Check } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { JOBS_DATA } from "@/lib/jobs-data";
import { motion } from "framer-motion";
import { WordsPullUp } from "@/components/effects/WordsPullUp";
import { WordsPullUpMultiStyle } from "@/components/effects/WordsPullUpMultiStyle";
import { AnimatedParagraph } from "@/components/effects/AnimatedLetter";

export default function JobDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { appliedJobs, applyForJob, user } = useAppStore();
  const [errorState, setErrorState] = React.useState<string | null>(null);

  const job = useMemo(() => {
    return JOBS_DATA.find(j => String(j.id) === id);
  }, [id]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Job not found</h2>
        <button className="px-6 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors" onClick={() => router.push("/dashboard/employee/jobs")}>
          Back to Jobs
        </button>
      </div>
    );
  }

  const hasApplied = appliedJobs.includes(String(job.id));

  const handleApplyClick = () => {
    if (!user) {
      setErrorState("Please complete your profile first.");
      setTimeout(() => setErrorState(null), 5000);
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
      setErrorState("Not eligible: " + errorReason.join(", "));
      setTimeout(() => setErrorState(null), 5000);
      return;
    }

    applyForJob(String(job.id));
  };

  const Section = ({ title, icon: Icon, children }: any) => (
    <div className="border border-white/5 rounded-xl bg-white/[0.02] p-6 flex flex-col mb-6 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
        <Icon className="w-5 h-5 text-aetheris-cyan" />
        <h2 className="text-[15px] font-medium text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );

  return (
    <div className="w-full font-almarai text-[#DEDBC8] bg-black overflow-hidden min-h-screen">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen p-4 md:p-6">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          <video
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 prisma-noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
          
          {/* Navbar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 z-50">
            <nav className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
              <button onClick={() => router.back()} className="flex items-center gap-2 text-[10px] sm:text-xs md:text-sm whitespace-nowrap transition-colors" style={{ color: "rgba(225, 224, 204, 0.8)" }} onMouseEnter={(e) => e.currentTarget.style.color = "#E1E0CC"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)"}>
                <ArrowLeft className="w-3 h-3" /> Back to Jobs
              </button>
            </nav>
          </div>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-20">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-8">
                <WordsPullUp 
                  text={job.company} 
                  showAsterisk={true}
                  className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] xl:text-[13vw] 2xl:text-[14vw] font-medium leading-[0.85] tracking-[-0.05em] text-[#E1E0CC] break-words"
                />
              </div>
              <div className="md:col-span-4 flex flex-col items-start gap-6 pb-4">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-[#DEDBC8]/80 text-sm md:text-base leading-[1.4] space-y-2"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-white">{job.title}</h1>
                    {job.aiRecommended && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-aetheris-cyan/20 text-aetheris-cyan border border-aetheris-cyan/30">
                        AI Match
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> {job.type} • {job.salary}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Posted {job.posted}
                  </div>
                </motion.div>
                
                <div className="flex flex-col gap-2">
                  {hasApplied ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 bg-emerald-500/20 rounded-full pl-6 pr-6 py-3 text-emerald-400 font-medium text-sm sm:text-base border border-emerald-500/30"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Application Submitted
                    </motion.div>
                  ) : (
                    <>
                      <motion.button 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        onClick={handleApplyClick}
                        className="group flex items-center gap-2 bg-[#DEDBC8] rounded-full pl-6 pr-2 py-2 text-black font-medium text-sm sm:text-base hover:gap-3 transition-all"
                      >
                        Apply Now
                        <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <ArrowRight className="w-4 h-4 text-[#DEDBC8]" />
                        </div>
                      </motion.button>
                      {errorState && (
                        <div className="text-sm text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-400/20 animate-in fade-in max-w-xs">
                          {errorState}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-black py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto bg-[#101010] rounded-3xl p-8 sm:p-12 md:p-20 text-center">
          <span className="inline-block text-[#DEDBC8] text-[10px] sm:text-xs uppercase tracking-wider mb-8">
            {job.companyDetails?.industry || "Technology"}
          </span>
          <div className="mb-12">
            <WordsPullUpMultiStyle 
              segments={[
                { text: `We are looking for a `, className: "font-normal" },
                { text: `${job.title} `, className: "font-serif italic text-white" },
                { text: `to join our team.`, className: "font-normal" }
              ]}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-[#E1E0CC]"
            />
          </div>
          <div className="max-w-2xl mx-auto">
            <AnimatedParagraph 
              text={job.aboutCompany || "No company description available at this time."}
              className="text-[#DEDBC8] text-sm md:text-lg leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative min-h-screen bg-black py-24 px-4 sm:px-6">
        <div className="absolute inset-0 prisma-bg-noise opacity-[0.15] pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16">
            <WordsPullUpMultiStyle 
              segments={[
                { text: "Role overview & requirements.", className: "text-[#E1E0CC] block" },
                { text: "Everything you need to know about the position.", className: "text-gray-500 block mt-2 text-xl" }
              ]}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal flex flex-col items-start text-left"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
            {/* Card 1: Company Details */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl overflow-hidden bg-[#212121] h-[400px] lg:h-full p-6 flex flex-col justify-end"
            >
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10">
                <h3 className="text-[#E1E0CC] text-xl font-medium mb-4">Company Details</h3>
                <ul className="space-y-2 text-sm text-[#DEDBC8]/80">
                  <li><strong className="text-white">Industry:</strong> {job.companyDetails?.industry || "N/A"}</li>
                  <li><strong className="text-white">Size:</strong> {job.companyDetails?.size || "N/A"} Employees</li>
                  <li><strong className="text-white">Founded:</strong> {job.companyDetails?.founded || "N/A"}</li>
                </ul>
              </div>
            </motion.div>

            {/* Card 2: Tech Stack */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-[#212121] p-6 sm:p-8 flex flex-col h-[400px] lg:h-full overflow-y-auto custom-scrollbar"
            >
              <Star className="w-8 h-8 text-aetheris-cyan mb-6" />
              <h3 className="text-[#E1E0CC] text-xl sm:text-2xl mb-6">Tech Stack.<br/><span className="text-sm text-gray-500">(01)</span></h3>
              <div className="flex flex-wrap gap-2">
                {job.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-black/40 text-[#DEDBC8] border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Card 3: Requirements */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.45, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-[#212121] p-6 sm:p-8 flex flex-col h-[400px] lg:h-full overflow-y-auto custom-scrollbar"
            >
              <CheckCircle2 className="w-8 h-8 text-aetheris-rose mb-6" />
              <h3 className="text-[#E1E0CC] text-xl sm:text-2xl mb-6">Requirements.<br/><span className="text-sm text-gray-500">(02)</span></h3>
              <ul className="space-y-4 flex-1">
                {job.requirements && job.requirements.length > 0 ? job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-xs leading-relaxed">
                    <Check className="w-3.5 h-3.5 text-[#DEDBC8] shrink-0 mt-0.5" />
                    {req}
                  </li>
                )) : (
                  <li className="text-gray-500 text-sm">No specific requirements listed.</li>
                )}
              </ul>
            </motion.div>

            {/* Card 4: Links */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-[#212121] p-6 sm:p-8 flex flex-col h-[400px] lg:h-full"
            >
              <ExternalLink className="w-8 h-8 text-aetheris-amber mb-6" />
              <h3 className="text-[#E1E0CC] text-xl sm:text-2xl mb-6">Official Links.<br/><span className="text-sm text-gray-500">(03)</span></h3>
              <ul className="space-y-4 flex-1">
                {job.officialLinks?.website && (
                  <li>
                    <a href={job.officialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors">
                      <Globe className="w-4 h-4 text-[#DEDBC8]" /> Website
                    </a>
                  </li>
                )}
                {job.officialLinks?.linkedin && (
                  <li>
                    <a href={job.officialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-[#0a66c2] transition-colors">
                      <Users className="w-4 h-4 text-[#DEDBC8]" /> LinkedIn
                    </a>
                  </li>
                )}
                {job.officialLinks?.twitter && (
                  <li>
                    <a href={job.officialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-[#1da1f2] transition-colors">
                      <MessageCircle className="w-4 h-4 text-[#DEDBC8]" /> Twitter
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
