"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { User, Mail, Briefcase, MapPin, Link as LinkIcon, Save, Edit3, Shield, Star, Award, Book, Plus, Trash2, ExternalLink, Link2, Code2, Upload, CheckCircle2, FileText } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "personal" | "skills" | "experience" | "education" | "links" | "certifications";

export default function ProfilePage() {
  const { user } = useAppStore();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("personal");
  const [mounted, setMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Chen",
    email: "alex.chen@example.com",
    title: "Senior Full Stack Engineer",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    bio: "Passionate engineer with 8+ years of experience building scalable web applications and AI-driven platforms. Specialized in React, Node.js, and distributed systems."
  });

  const [skills, setSkills] = useState([
    { id: 1, name: "React / Next.js", level: "Expert", score: 98, verified: true },
    { id: 2, name: "TypeScript", level: "Advanced", score: 92, verified: true },
    { id: 3, name: "Node.js", level: "Advanced", score: 88, verified: true },
    { id: 4, name: "PostgreSQL", level: "Intermediate", score: 75, verified: false },
    { id: 5, name: "GraphQL", level: "Intermediate", score: 70, verified: false },
  ]);

  const [experience, setExperience] = useState([
    { id: 1, company: "Scale AI", role: "Senior ML Engineer", period: "2023 - Present", description: "Leading a team of 4 engineers building the core ML infrastructure." },
    { id: 2, company: "Google", role: "Software Engineer", period: "2020 - 2023", description: "Worked on Google Cloud Platform's identity and access management systems." }
  ]);

  const [education, setEducation] = useState([
    { id: 1, institution: "Stanford University", degree: "M.S. Computer Science", year: "2020" },
    { id: 2, institution: "UC Berkeley", degree: "B.S. Electrical Engineering & Computer Science", year: "2018" }
  ]);

  const [professionalLinks, setProfessionalLinks] = useState({
    linkedin: "https://linkedin.com/in/alexchen",
    github: "https://github.com/alexchen",
    leetcode: "https://leetcode.com/alexchen"
  });

  const [certifications, setCertifications] = useState([
    { id: 1, name: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2024", verified: true, file: "aws-cert.pdf" },
    { id: 2, name: "React Developer Certification", issuer: "Meta", date: "2023", verified: false, file: null }
  ]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
      }));
    }

    const fetchProfile = async () => {
      try {
        const { fetchAPI } = await import('@/lib/api');
        const profile = await fetchAPI('/employee/profile');
        if (profile && !profile.error) {
          const names = profile.firstName && profile.lastName 
            ? [profile.firstName, profile.lastName] 
            : (profile.name || '').split(' ');
            
          setFormData(prev => ({
            ...prev,
            firstName: names[0] || prev.firstName,
            lastName: names.slice(1).join(' ') || prev.lastName,
            title: profile.headline || prev.title,
            bio: profile.bio || prev.bio,
            location: profile.location || prev.location,
            website: profile.portfolioLinks?.[0] || prev.website,
          }));

          if (profile.workExperiences?.length) setExperience(profile.workExperiences);
          if (profile.education?.length) setEducation(profile.education);
          if (profile.certifications?.length) {
            setCertifications(profile.certifications.map((c: string, i: number) => ({
              id: i + 1, name: c, issuer: "Verified Issuer", date: "Present", verified: true, file: null
            })));
          }
          if (profile.techStack?.length) {
             setSkills(profile.techStack.map((s: string, i: number) => ({
               id: i + 1, name: s, level: "Intermediate", score: 80, verified: true
             })));
          }
          
          setProfessionalLinks(prev => ({
            ...prev,
            linkedin: profile.socialLinks?.[0] || prev.linkedin,
            github: profile.socialLinks?.[1] || prev.github,
          }));
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleLinkChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setProfessionalLinks(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const { fetchAPI } = await import('@/lib/api');
      
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        headline: formData.title,
        bio: formData.bio,
        location: formData.location,
        workExperiences: experience,
        education: education,
        certifications: certifications.map(c => c.name),
        socialLinks: [professionalLinks.linkedin, professionalLinks.github].filter(Boolean),
        portfolioLinks: [formData.website].filter(Boolean),
        techStack: skills.map(s => s.name)
      };

      await fetchAPI('/employee/profile', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  }, [formData, experience, education, certifications, professionalLinks, skills]);

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Identity Profile</h1>
          <p className="text-aetheris-muted text-sm">Manage your professional identity and public information.</p>
        </div>
        {!isEditing ? (
          <GlassButton variant="secondary" icon={<Edit3 className="w-4 h-4" />} onClick={() => setIsEditing(true)}>
            Edit Profile
          </GlassButton>
        ) : (
          <GlassButton variant="primary" icon={<Save className="w-4 h-4" />} onClick={handleSave}>
            Save Changes
          </GlassButton>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard className="flex flex-col items-center p-6 text-center">
            <div className="w-28 h-28 rounded-full glass-sm flex items-center justify-center text-4xl font-display font-bold text-aetheris-cyan mb-4 border border-aetheris-cyan/30 shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
              {formData.firstName[0]}{formData.lastName[0]}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-aetheris-emerald rounded-full border-2 border-[#0B0D14]" />
            </div>
            <h2 className="text-xl font-semibold text-white">{formData.firstName} {formData.lastName}</h2>
            <p className="text-aetheris-cyan text-xs mb-3">{formData.title}</p>
            <div className="w-full flex items-center gap-1 text-[11px] text-aetheris-muted bg-white/5 p-2 rounded-lg justify-center">
              <MapPin className="w-3 h-3" />
              {formData.location}
            </div>
          </GlassCard>

          <GlassCard className="p-0 overflow-hidden">
             <div className="flex flex-col">
                <button 
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "personal" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <User className="w-4 h-4" /> Personal Info
                </button>
                <button 
                  onClick={() => setActiveTab("skills")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "skills" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <Star className="w-4 h-4" /> Skills & Score
                </button>
                <button 
                  onClick={() => setActiveTab("experience")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "experience" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <Briefcase className="w-4 h-4" /> Experience
                </button>
                <button 
                  onClick={() => setActiveTab("education")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "education" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <Book className="w-4 h-4" /> Education
                </button>
                <button 
                  onClick={() => setActiveTab("links")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "links" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <LinkIcon className="w-4 h-4" /> Professional Links
                </button>
                <button 
                  onClick={() => setActiveTab("certifications")}
                  className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${activeTab === "certifications" ? "bg-white/10 text-white border-l-2 border-aetheris-cyan" : "text-aetheris-muted hover:bg-white/5 border-l-2 border-transparent"}`}
                >
                  <Award className="w-4 h-4" /> Certifications
                </button>
             </div>
          </GlassCard>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-3">
           <AnimatePresence mode="wait">
              {/* Personal Info Tab */}
              {activeTab === "personal" && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Personal Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <GlassInput
                          name="firstName"
                          label="First Name"
                          icon={User}
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <GlassInput
                          name="lastName"
                          label="Last Name"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <GlassInput
                        name="email"
                        label="Email Address"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <GlassInput
                          name="title"
                          label="Professional Title"
                          icon={Briefcase}
                          value={formData.title}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                        <GlassInput
                          name="location"
                          label="Location"
                          icon={MapPin}
                          value={formData.location}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                      
                      <GlassInput
                        name="website"
                        label="Portfolio / Website"
                        type="url"
                        icon={LinkIcon}
                        value={formData.website}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />

                      <div className="pt-2">
                        <label className="block text-sm text-aetheris-muted mb-2">Professional Summary</label>
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full h-32 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] disabled:opacity-50 resize-none transition-all"
                        />
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Skills Tab */}
              {activeTab === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-lg font-semibold text-white">Skills & Verification</h3>
                       {isEditing && (
                         <GlassButton variant="secondary" size="sm" icon={<Plus className="w-3 h-3"/>}>Add Skill</GlassButton>
                       )}
                    </div>
                    
                    {/* AI Score Widget */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-aetheris-cyan/10 to-transparent border border-aetheris-cyan/20 mb-8 flex items-center gap-6">
                       <div className="w-16 h-16 rounded-full glass-sm flex items-center justify-center shrink-0 border border-aetheris-cyan/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                         <span className="text-2xl font-bold text-aetheris-cyan">92</span>
                       </div>
                       <div>
                         <h4 className="text-aetheris-white font-semibold mb-1 flex items-center gap-2">
                           <Award className="w-4 h-4 text-aetheris-cyan" />
                           AI Skill Score: Expert
                         </h4>
                         <p className="text-sm text-aetheris-muted">
                           Based on verified projects, peer reviews, and technical assessments, you are in the top 5% of React/Node developers in our network.
                         </p>
                       </div>
                    </div>

                    <div className="space-y-3">
                       {skills.map(skill => (
                         <div key={skill.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex-1">
                               <div className="flex items-center gap-2 mb-1">
                                 <span className="font-medium text-aetheris-white">{skill.name}</span>
                                 {skill.verified && (
                                   <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                      <Shield className="w-3 h-3" /> Verified
                                   </div>
                                 )}
                               </div>
                               <span className="text-xs text-aetheris-muted">{skill.level}</span>
                            </div>
                            <div className="flex items-center gap-4">
                               <div className="flex flex-col items-end gap-1">
                                  <span className="text-xs font-medium text-aetheris-cyan">{skill.score}/100</span>
                                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                                     <div className="h-full bg-aetheris-cyan rounded-full" style={{ width: `${skill.score}%` }} />
                                  </div>
                               </div>
                               {isEditing && (
                                 <button className="p-2 text-aetheris-muted hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-400/10">
                                   <Trash2 className="w-4 h-4" />
                                 </button>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-lg font-semibold text-white">Experience Timeline</h3>
                       {isEditing && (
                         <GlassButton variant="secondary" size="sm" icon={<Plus className="w-3 h-3"/>}>Add Experience</GlassButton>
                       )}
                    </div>

                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-aetheris-cyan before:via-white/10 before:to-transparent">
                      {experience.map((exp, idx) => (
                        <div key={exp.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          {/* Marker */}
                          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-aetheris-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 text-aetheris-cyan relative z-10">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          
                          {/* Card */}
                          <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5 shadow">
                            <div className="flex items-center justify-between mb-1">
                               <h4 className="font-bold text-aetheris-white">{exp.role}</h4>
                               {isEditing && (
                                 <button className="text-aetheris-muted hover:text-white"><Edit3 className="w-3 h-3"/></button>
                               )}
                            </div>
                            <div className="flex items-center justify-between text-xs text-aetheris-muted mb-3">
                               <span>{exp.company}</span>
                               <span className="text-aetheris-cyan/70">{exp.period}</span>
                            </div>
                            <p className="text-sm text-aetheris-muted/80">{exp.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Education Tab */}
              {activeTab === "education" && (
                <motion.div
                  key="education"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-lg font-semibold text-white">Education</h3>
                       {isEditing && (
                         <GlassButton variant="secondary" size="sm" icon={<Plus className="w-3 h-3"/>}>Add Education</GlassButton>
                       )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                       {education.map(edu => (
                          <div key={edu.id} className="p-5 rounded-xl border border-white/5 bg-white/5 relative group">
                             {isEditing && (
                               <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-1.5 text-aetheris-muted hover:text-white bg-black/20 rounded-md"><Edit3 className="w-3 h-3"/></button>
                               </div>
                             )}
                             <div className="w-10 h-10 rounded-lg glass-sm flex items-center justify-center text-aetheris-violet mb-4">
                                <Book className="w-5 h-5" />
                             </div>
                             <h4 className="font-bold text-aetheris-white mb-1">{edu.degree}</h4>
                             <p className="text-sm text-aetheris-muted mb-2">{edu.institution}</p>
                             <div className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-xs text-aetheris-muted font-mono">
                               Class of {edu.year}
                             </div>
                          </div>
                       ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Professional Links Tab */}
              {activeTab === "links" && (
                <motion.div
                  key="links"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Professional Links</h3>
                    <div className="space-y-5">
                      <div className="space-y-1">
                        <label className="text-sm text-aetheris-muted flex items-center gap-2">
                          <Link2 className="w-4 h-4 text-blue-400" /> LinkedIn Profile
                        </label>
                        <div className="flex gap-3">
                          <input
                            name="linkedin"
                            type="url"
                            value={professionalLinks.linkedin}
                            onChange={handleLinkChange}
                            disabled={!isEditing}
                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] disabled:opacity-50 transition-all"
                            placeholder="https://linkedin.com/in/yourprofile"
                          />
                          {professionalLinks.linkedin && (
                            <a
                              href={professionalLinks.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-3 rounded-xl border border-white/10 text-aetheris-cyan hover:bg-aetheris-cyan/10 transition-all"
                            >
                              <LinkIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-aetheris-muted flex items-center gap-2">
                          <ExternalLink className="w-4 h-4" /> GitHub Profile
                        </label>
                        <div className="flex gap-3">
                          <input
                            name="github"
                            type="url"
                            value={professionalLinks.github}
                            onChange={handleLinkChange}
                            disabled={!isEditing}
                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] disabled:opacity-50 transition-all"
                            placeholder="https://github.com/yourprofile"
                          />
                          {professionalLinks.github && (
                            <a
                              href={professionalLinks.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-3 rounded-xl border border-white/10 text-aetheris-cyan hover:bg-aetheris-cyan/10 transition-all"
                            >
                              <LinkIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-sm text-aetheris-muted flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-orange-400" /> LeetCode Profile
                        </label>
                        <div className="flex gap-3">
                          <input
                            name="leetcode"
                            type="url"
                            value={professionalLinks.leetcode}
                            onChange={handleLinkChange}
                            disabled={!isEditing}
                            className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 text-aetheris-white text-sm focus:outline-none focus:border-aetheris-cyan/50 focus:bg-white/[0.05] disabled:opacity-50 transition-all"
                            placeholder="https://leetcode.com/yourprofile"
                          />
                          {professionalLinks.leetcode && (
                            <a
                              href={professionalLinks.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-3 rounded-xl border border-white/10 text-aetheris-cyan hover:bg-aetheris-cyan/10 transition-all"
                            >
                              <LinkIcon className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Certifications Tab */}
              {activeTab === "certifications" && (
                <motion.div
                  key="certifications"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h3 className="text-lg font-semibold text-white">Certifications</h3>
                       {isEditing && (
                         <label className="cursor-pointer">
                           <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                           <GlassButton variant="secondary" size="sm" icon={<Upload className="w-3 h-3"/>}>Upload Certificate</GlassButton>
                         </label>
                       )}
                    </div>

                    <div className="space-y-4">
                       {certifications.map(cert => (
                          <div key={cert.id} className="p-5 rounded-xl border border-white/5 bg-white/5 relative group">
                             {isEditing && (
                               <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                 <button className="p-1.5 text-aetheris-muted hover:text-white bg-black/20 rounded-md"><Edit3 className="w-3 h-3"/></button>
                                 <button className="p-1.5 text-aetheris-muted hover:text-rose-400 bg-black/20 rounded-md"><Trash2 className="w-3 h-3"/></button>
                               </div>
                             )}
                             <div className="flex items-start gap-4">
                               <div className="w-12 h-12 rounded-lg glass-sm flex items-center justify-center text-aetheris-amber bg-aetheris-amber/10 shrink-0">
                                  <FileText className="w-6 h-6" />
                               </div>
                               <div className="flex-1">
                                 <div className="flex items-center gap-2 mb-1">
                                   <h4 className="font-bold text-aetheris-white">{cert.name}</h4>
                                   {cert.verified && (
                                     <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                        <CheckCircle2 className="w-3 h-3" /> Verified
                                     </div>
                                   )}
                                 </div>
                                 <p className="text-sm text-aetheris-muted mb-2">{cert.issuer}</p>
                                 <div className="flex items-center justify-between">
                                   <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 text-xs text-aetheris-muted font-mono">
                                     {cert.date}
                                   </span>
                                   {cert.file && (
                                     <button className="text-xs text-aetheris-cyan hover:text-aetheris-cyan/80 flex items-center gap-1">
                                       <LinkIcon className="w-3 h-3" /> View Certificate
                                     </button>
                                   )}
                                 </div>
                               </div>
                             </div>
                          </div>
                       ))}

                       {isEditing && (
                         <label className="cursor-pointer block">
                           <div className="p-6 rounded-xl border-2 border-dashed border-white/10 hover:border-aetheris-cyan/30 hover:bg-aetheris-cyan/5 transition-all flex flex-col items-center justify-center text-aetheris-muted">
                             <div className="w-12 h-12 rounded-full glass-sm flex items-center justify-center mb-4 bg-white/5">
                               <Upload className="w-5 h-5" />
                             </div>
                             <span className="font-medium">Upload New Certificate</span>
                             <span className="text-xs mt-2 text-aetheris-subtle">PDF, PNG, or JPG up to 5MB</span>
                           </div>
                           <input type="file" className="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                         </label>
                       )}
                    </div>
                  </GlassCard>
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
