"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { Briefcase, MapPin, DollarSign, Layers, Globe, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PostJobPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    techStack: "",
    languages: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to the backend
    console.log("Job posted:", formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({
      title: "",
      location: "",
      salary: "",
      type: "",
      experience: "",
      techStack: "",
      languages: "",
      description: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pt-10">

      <GlassCard padding="xl" className="relative overflow-hidden">
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Job Posted Successfully!</h2>
            <p className="text-aetheris-muted">Your job listing is now live and visible to candidates.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassInput 
                label="Job Title" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                icon={Briefcase} 
                required 
              />
              <GlassInput 
                label="Location" 
                name="location"
                value={formData.location}
                onChange={handleChange}
                icon={MapPin} 
                required 
              />
              <GlassInput 
                label="Job Type (e.g. Full-time, Contract)" 
                name="type"
                value={formData.type}
                onChange={handleChange}
                icon={Clock} 
                required 
              />
              <GlassInput 
                label="Min Experience Required (0 for Fresher)" 
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                icon={Layers} 
                required 
              />
              <GlassInput 
                label="Tech Stack (comma separated)" 
                name="techStack"
                value={formData.techStack}
                onChange={handleChange}
                icon={Layers} 
                required 
              />
              <GlassInput 
                label="Languages Required (comma separated)" 
                name="languages"
                value={formData.languages}
                onChange={handleChange}
                icon={Globe} 
                required 
              />
            </div>

            <div className="pt-6 relative">
              <label className="block text-sm text-aetheris-muted mb-2 absolute top-0 left-4 z-10 transition-all px-1 bg-transparent">
                Job Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full bg-[#161616]/80 backdrop-blur-[20px] border border-white/5 rounded-2xl px-6 py-4 text-aetheris-white text-sm transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_12px_rgba(0,0,0,0.5)] focus:outline-none focus:bg-[#2a2a2a]/60 focus:border-white/15 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_0_20px_rgba(255,255,255,0.03)] placeholder:text-transparent min-h-[150px]"
                placeholder="Job Description"
              />
            </div>

            <div className="flex justify-end pt-8">
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] text-white font-medium rounded-full px-10 py-3 hover:opacity-90 transition-opacity"
              >
                Post Job
              </button>
            </div>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
