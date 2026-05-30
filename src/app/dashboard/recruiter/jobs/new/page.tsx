"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { Briefcase, MapPin, DollarSign, Calendar, Save, ArrowLeft } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewJobPage() {
  const router = useRouter();
  const { user, postJob } = useAppStore();
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    skills: "",
    experience: "",
    salary: "",
    location: "",
    workType: "Hybrid",
    description: "",
    lastDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postJob({
      companyName: user?.companyName || "Unknown Company",
      companyId: user?.id || "unknown",
      jobTitle: formData.jobTitle,
      skills: formData.skills.split(",").map((s) => s.trim()),
      experience: formData.experience,
      salary: formData.salary,
      location: formData.location,
      workType: formData.workType,
      description: formData.description,
      lastDate: formData.lastDate,
    });
    router.push("/dashboard/recruiter/jobs");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/recruiter/jobs">
          <GlassButton variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Back
          </GlassButton>
        </Link>
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Post New Job</h1>
          <p className="text-aetheris-muted text-sm">Create a new opportunity on the AETHERIS network.</p>
        </div>
      </div>

      <GlassCard padding="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassInput
              name="jobTitle"
              label="Job Title"
              icon={Briefcase}
              required
              value={formData.jobTitle}
              onChange={handleChange}
            />
            
            <GlassInput
              name="skills"
              label="Skills Required (comma separated)"
              required
              value={formData.skills}
              onChange={handleChange}
            />
            
            <GlassInput
              name="experience"
              label="Experience Required"
              required
              value={formData.experience}
              onChange={handleChange}
            />
            
            <GlassInput
              name="salary"
              label="Salary Range (e.g., ₹15 LPA)"
              icon={DollarSign}
              required
              value={formData.salary}
              onChange={handleChange}
            />
            
            <GlassInput
              name="location"
              label="Location"
              icon={MapPin}
              required
              value={formData.location}
              onChange={handleChange}
            />

            <div className="relative w-full">
              <label className="absolute left-4 top-1 text-xs text-aetheris-muted z-10">Work Type</label>
              <select
                name="workType"
                value={formData.workType}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-4 pt-6 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] transition-all appearance-none"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <GlassInput
              name="lastDate"
              label="Last Date to Apply"
              type="date"
              icon={Calendar}
              required
              value={formData.lastDate}
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <label className="block text-sm text-aetheris-muted mb-2">Job Description</label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full h-32 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] resize-none transition-all"
              placeholder="Detail the role, responsibilities, and requirements..."
            />
          </div>

          <div className="flex justify-end pt-4">
            <GlassButton type="submit" variant="primary" icon={<Save className="w-4 h-4" />}>
              Publish Job
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
