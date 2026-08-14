"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { Briefcase, MapPin, DollarSign, Layers, Globe, Clock, CheckCircle2, Plus, X, Edit3, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore, Job } from "@/lib/store";
import toast from "react-hot-toast";

export default function PostJobPage() {
  const { jobs, postJob, updateJob, deleteJob } = useAppStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

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

  const [editFormData, setEditFormData] = useState({
    title: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    techStack: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitized = name === "experience" ? value.replace(/[^0-9]/g, "") : value;
    setFormData({ ...formData, [name]: sanitized });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const sanitized = name === "experience" ? value.replace(/[^0-9]/g, "") : value;
    setEditFormData({ ...editFormData, [name]: sanitized });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    postJob({
      jobTitle: formData.title,
      location: formData.location,
      salary: formData.salary,
      workType: formData.type,
      experience: formData.experience,
      skills: formData.techStack.split(",").map(s => s.trim()).filter(Boolean),
      description: formData.description,
    });
    
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
    setIsAdding(false);
    toast.success("Job posted successfully!");
  };

  const handleStartEdit = (job: Job) => {
    setEditingJob(job);
    setEditFormData({
      title: job.jobTitle || "",
      location: job.location || "",
      salary: job.salary || "",
      type: job.workType || "",
      experience: job.experience || "",
      techStack: (job.skills || []).join(", "),
      description: job.description || "",
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    updateJob(editingJob.id, {
      jobTitle: editFormData.title,
      location: editFormData.location,
      salary: editFormData.salary,
      workType: editFormData.type,
      experience: editFormData.experience,
      skills: editFormData.techStack.split(",").map(s => s.trim()).filter(Boolean),
      description: editFormData.description,
    });

    setEditingJob(null);
    toast.success("Job details updated successfully!");
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      deleteJob(id);
      if (editingJob?.id === id) setEditingJob(null);
      toast.success("Job position removed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10 p-4 pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pl-2">
        <div>
          <h1 className="text-4xl text-white font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Posted <span className="text-[#e8d5c4] not-italic">Jobs</span>.
          </h1>
          <p className="text-gray-400 text-sm ml-1 mt-2">Manage your active job postings and open positions.</p>
        </div>
        <GlassButton variant="primary" onClick={() => setIsAdding(!isAdding)} className="flex items-center gap-2">
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Cancel" : "Post New Job"}
        </GlassButton>
      </div>

      {/* Post New Job Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="liquid-glass-strong p-6 md:p-10 rounded-[24px] border border-white/10 mb-8 space-y-6 bg-black/40 backdrop-blur-2xl">
              <h2 className="text-xl text-white font-medium mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-aetheris-cyan" /> Post a New Position
              </h2>
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
                  min="0"
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
                  label="Salary Range (e.g. $120k - $150k)" 
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  icon={DollarSign} 
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
                  className="w-full bg-[#161616]/80 backdrop-blur-[20px] border border-white/5 rounded-2xl px-6 py-4 text-aetheris-white text-sm transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_12px_rgba(0,0,0,0.5)] focus:outline-none focus:bg-[#2a2a2a]/60 focus:border-white/15 min-h-[150px]"
                  placeholder="Job Description"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium rounded-full px-10 py-3 hover:opacity-90 transition-opacity"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit Job Modal */}
      <AnimatePresence>
        {editingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto liquid-glass-strong p-6 md:p-10 rounded-[28px] border border-white/20 bg-[#0d1515] shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-aetheris-cyan" />
                  <h2 className="text-2xl font-semibold text-white">Update Job Details</h2>
                </div>
                <button 
                  onClick={() => setEditingJob(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <GlassInput 
                    label="Job Title" 
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    icon={Briefcase} 
                    required 
                  />
                  <GlassInput 
                    label="Location" 
                    name="location"
                    value={editFormData.location}
                    onChange={handleEditChange}
                    icon={MapPin} 
                    required 
                  />
                  <GlassInput 
                    label="Job Type" 
                    name="type"
                    value={editFormData.type}
                    onChange={handleEditChange}
                    icon={Clock} 
                    required 
                  />
                  <GlassInput 
                    label="Min Experience Required" 
                    name="experience"
                    type="number"
                    min="0"
                    value={editFormData.experience}
                    onChange={handleEditChange}
                    icon={Layers} 
                    required 
                  />
                  <GlassInput 
                    label="Tech Stack (comma separated)" 
                    name="techStack"
                    value={editFormData.techStack}
                    onChange={handleEditChange}
                    icon={Layers} 
                    required 
                  />
                  <GlassInput 
                    label="Salary Range" 
                    name="salary"
                    value={editFormData.salary}
                    onChange={handleEditChange}
                    icon={DollarSign} 
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-sm text-aetheris-muted mb-2">Job Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    required
                    className="w-full bg-[#161616]/80 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-white/20 min-h-[140px]"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => handleDelete(editingJob.id)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm hover:bg-red-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Job
                  </button>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setEditingJob(null)}
                      className="px-6 py-2.5 rounded-full border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {jobs.map((job) => (
          <div key={job.id} className="liquid-glass p-6 rounded-[24px] border border-white/10 hover:border-white/20 transition-colors flex flex-col bg-black/30 backdrop-blur-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-medium text-white mb-1 capitalize">{job.jobTitle}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-400 capitalize">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location || "Remote"}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.workType || "Full-time"}</span>
                </div>
              </div>
              {job.salary && (
                <span className="px-3 py-1 bg-[#d6cdb5]/10 text-[#d6cdb5] rounded-full text-xs font-medium border border-[#d6cdb5]/20">
                  {job.salary}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed flex-1 capitalize">
              {job.description}
            </p>

            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-gray-300 capitalize">
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-gray-500 mb-4">
              <span>Experience: {job.experience || '0'} years</span>
              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleStartEdit(job)}
                className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white font-medium transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Edit3 className="w-4 h-4 text-[#e8d5c4]" /> Update Details
              </button>
              <button 
                onClick={() => handleDelete(job.id)}
                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-red-400 transition-colors duration-200 flex items-center justify-center cursor-pointer"
                title="Delete Job"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && !isAdding && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <Briefcase className="w-6 h-6 text-gray-500" />
            </div>
            <p className="text-gray-400 mb-2">No jobs posted yet</p>
            <p className="text-sm text-gray-500 max-w-sm">Click "Post New Job" to create your first open position and start receiving applications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
