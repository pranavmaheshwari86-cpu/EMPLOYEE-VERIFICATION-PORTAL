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
  const { appliedJobs, applyForJob, user, jobs: storeJobs } = useAppStore();
  const [errorState, setErrorState] = React.useState<string | null>(null);

  const job = useMemo(() => {
    const formattedStoreJobs = storeJobs.map(j => ({
      id: j.id,
      title: j.jobTitle,
      company: j.companyName || user?.companyName || "Unknown Company",
      location: j.location || "Remote",
      salary: j.salary || "Competitive",
      type: j.workType || "Full-time",
      match: 100,
      posted: new Date(j.createdAt).toLocaleDateString(),
      logo: (j.companyName || "C").charAt(0).toUpperCase(),
      aiRecommended: true,
      minExperience: parseInt(j.experience) || 0,
      techStack: j.skills || [],
      languages: [],
      aboutCompany: j.description || "",
      companyDetails: { industry: "Tech", size: "Unknown", founded: "Unknown" },
      officialLinks: {},
      requirements: [j.description || ""]
    }));

    const allJobs = [...formattedStoreJobs, ...JOBS_DATA];
    return allJobs.find(j => String(j.id) === id);
  }, [id, storeJobs, user]);

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

  const Section = ({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) => (
  <div className="w-full flex flex-col mb-6 bg-black/30 backdrop-blur-2xl border border-white/5 rounded-3xl p-8">
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
        <Icon className="w-4 h-4 text-[#d6cdb5]" />
        <span className="text-xs font-bold tracking-[0.15em] text-gray-300 uppercase mt-0.5">{title}</span>
      </div>
    </div>
    <div className="flex-1">
      {children}
    </div>
  </div>
);

  return (
    <div className="p-8 max-w-6xl mx-auto text-gray-300 min-h-screen">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-white mb-3 capitalize">{job.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-base text-gray-400 capitalize">
            <span className="flex items-center gap-1.5"><Briefcase className="w-5 h-5 text-aetheris-cyan" /> {job.company}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-5 h-5 text-aetheris-cyan" /> {job.location}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-5 h-5 text-aetheris-cyan" /> {job.type}</span>
            <span className="flex items-center gap-1.5 text-[#d6cdb5]">{job.salary}</span>
            <span className="flex items-center gap-1.5 text-gray-500">Posted {job.posted}</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          {hasApplied ? (
            <div className="flex items-center gap-2 bg-emerald-500/10 px-6 py-3 rounded-xl text-emerald-400 font-medium text-sm border border-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
              Application Submitted
            </div>
          ) : (
            <button 
              onClick={handleApplyClick}
              className="flex items-center justify-center gap-2 bg-white text-black px-8 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {errorState && (
            <div className="text-sm text-red-400 mt-2 text-right">
              {errorState}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-8">
          <Section title="Company Introduction" icon={Briefcase}>
            <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-line">
              {job.aboutCompany || "No company description available."}
            </p>
          </Section>

          <Section title="Job Requirements" icon={CheckCircle2}>
            {job.requirements && job.requirements.length > 0 ? (
              <ul className="space-y-4">
                {job.requirements.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                    <Check className="w-4 h-4 text-aetheris-cyan shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No specific requirements listed.</p>
            )}
          </Section>
          
          <Section title="Tech Stack" icon={Star}>
            <div className="flex flex-wrap gap-2">
              {job.techStack.map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
          </Section>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-8">
          <Section title="Company Details" icon={Users}>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-gray-500">Industry</span>
                <span className="text-gray-300 text-right">{job.companyDetails?.industry || "N/A"}</span>
              </li>
              <li className="flex justify-between items-center pb-4 border-b border-white/5">
                <span className="text-gray-500">Company Size</span>
                <span className="text-gray-300 text-right">{job.companyDetails?.size || "N/A"} Employees</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Founded</span>
                <span className="text-gray-300 text-right">{job.companyDetails?.founded || "N/A"}</span>
              </li>
            </ul>
          </Section>

          <Section title="Official Links" icon={ExternalLink}>
            <ul className="space-y-3">
              {job.officialLinks?.website && (
                <li>
                  <a href={job.officialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-white transition-colors p-3 rounded-lg bg-white/5 hover:bg-white/10">
                    <Globe className="w-4 h-4" /> Company Website
                  </a>
                </li>
              )}
              {job.officialLinks?.linkedin && (
                <li>
                  <a href={job.officialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-[#0a66c2] transition-colors p-3 rounded-lg bg-white/5 hover:bg-white/10">
                    <Users className="w-4 h-4" /> LinkedIn Profile
                  </a>
                </li>
              )}
              {job.officialLinks?.twitter && (
                <li>
                  <a href={job.officialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 text-sm hover:text-[#1da1f2] transition-colors p-3 rounded-lg bg-white/5 hover:bg-white/10">
                    <MessageCircle className="w-4 h-4" /> Twitter / X
                  </a>
                </li>
              )}
              {!job.officialLinks?.website && !job.officialLinks?.linkedin && !job.officialLinks?.twitter && (
                <p className="text-gray-500 text-sm">No official links provided.</p>
              )}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
