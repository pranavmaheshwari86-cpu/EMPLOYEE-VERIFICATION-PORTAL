"use client";

import React, { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowLeft, Building, ExternalLink, Globe, MessageCircle, Users } from "lucide-react";
import { JOBS_DATA } from "@/lib/jobs-data";

export default function CompanyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // Decoding the name parameter from the URL
  const companyName = params.name ? decodeURIComponent(params.name as string) : "";

  // Finding the first job that matches the company name to extract company details
  const companyInfo = useMemo(() => {
    return JOBS_DATA.find(j => j.company === companyName);
  }, [companyName]);

  if (!companyInfo) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Company not found</h2>
        <button 
          onClick={() => router.back()}
          className="text-aetheris-cyan hover:underline transition-all"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

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
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-aetheris-muted hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Jobs</span>
      </button>

      {/* Hero Section */}
      <GlassCard padding="lg" className="relative overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-aetheris-cyan/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <div className="w-24 h-24 rounded-2xl glass-sm flex items-center justify-center text-4xl font-bold text-white shrink-0 bg-white/5 border border-white/10 relative">
            {companyInfo.logo}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white">{companyInfo.company}</h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-aetheris-muted text-lg mt-4">
              <span className="flex items-center gap-1"><Building className="w-5 h-5" /> {companyInfo.companyDetails?.industry || "Technology"}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Section title="About the Company" icon={Building}>
            <p className="text-aetheris-muted leading-relaxed">
              {companyInfo.aboutCompany || "No company description available."}
            </p>
          </Section>
        </div>

        <div className="space-y-6">
          <Section title="Company Details" icon={Building}>
            <div className="space-y-4">
              <div>
                <div className="text-xs text-aetheris-subtle mb-1">Industry</div>
                <div className="text-white font-medium">{companyInfo.companyDetails?.industry || "N/A"}</div>
              </div>
              <div>
                <div className="text-xs text-aetheris-subtle mb-1">Company Size</div>
                <div className="text-white font-medium">{companyInfo.companyDetails?.size || "N/A"} Employees</div>
              </div>
              <div>
                <div className="text-xs text-aetheris-subtle mb-1">Founded</div>
                <div className="text-white font-medium">{companyInfo.companyDetails?.founded || "N/A"}</div>
              </div>
            </div>
          </Section>

          <Section title="Official Links" icon={ExternalLink}>
            <div className="flex flex-col gap-3">
              {companyInfo.officialLinks?.website && (
                <a href={companyInfo.officialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-aetheris-muted hover:text-white group">
                  <Globe className="w-5 h-5 group-hover:text-aetheris-cyan transition-colors" />
                  <span className="font-medium text-sm">Website</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {companyInfo.officialLinks?.linkedin && (
                <a href={companyInfo.officialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-aetheris-muted hover:text-white group">
                  <Users className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                  <span className="font-medium text-sm">LinkedIn</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
              {companyInfo.officialLinks?.twitter && (
                <a href={companyInfo.officialLinks.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-aetheris-muted hover:text-white group">
                  <MessageCircle className="w-5 h-5 group-hover:text-blue-300 transition-colors" />
                  <span className="font-medium text-sm">Twitter</span>
                  <ExternalLink className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
