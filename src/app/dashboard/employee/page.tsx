"use client";

import React, { useState, useEffect } from "react";
import { useAppStore } from "@/lib/store";
import { User, Briefcase, Link as LinkIcon, Plus, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

export default function EmployeeDashboardPage() {
  const { user, updateUser } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [profileForm, setProfileForm] = useState({
    introduction: "",
    experience: "",
    techStack: "",
    keySkills: "",
    languages: "",
    isFresher: false,
    linkedin: "",
    github: "",
    portfolio: ""
  });
  
  const [workExperiences, setWorkExperiences] = useState<{company: string, role: string, duration: string}[]>([]);

  useEffect(() => {
    setMounted(true);
    if (user) {
      setProfileForm({
        introduction: user.introduction || "",
        experience: user.experience?.toString() || "",
        techStack: user.techStack?.join(", ") || "",
        keySkills: "",
        languages: user.languages?.join(", ") || "",
        isFresher: user.isFresher || false,
        linkedin: "",
        github: "",
        portfolio: ""
      });
      if (user.workExperience) {
        setWorkExperiences(user.workExperience);
      }
    }
  }, [user]);

  const handleSaveIntroduction = () => {
    if (!profileForm.introduction.trim()) {
      alert("Introduction is compulsory!");
      return;
    }
    updateUser({ introduction: profileForm.introduction });
    alert("Introduction saved successfully!");
  };

  const handleSaveProfile = () => {
    if (!profileForm.techStack.trim() || !profileForm.keySkills.trim() || !profileForm.languages.trim()) {
      alert("Tech Stack, Key Skills, and Languages are compulsory!");
      return;
    }
    if (!profileForm.isFresher && !profileForm.experience.trim()) {
      alert("Years of Experience is compulsory for non-freshers!");
      return;
    }
    updateUser({
      isFresher: profileForm.isFresher,
      experience: profileForm.isFresher ? 0 : parseInt(profileForm.experience) || undefined,
      techStack: profileForm.techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
      languages: profileForm.languages.split(",").map((s: string) => s.trim()).filter(Boolean)
    });
    alert("Profile saved successfully!");
  };

  const handleSaveExperience = () => {
    if (!profileForm.isFresher) {
      if (workExperiences.length === 0) {
        alert("Work Experience is compulsory for non-freshers!");
        return;
      }
      for (const exp of workExperiences) {
        if (!exp.company.trim() || !exp.role.trim() || !exp.duration.trim()) {
          alert("All fields in Work Experience are compulsory!");
          return;
        }
      }
    }
    updateUser({ workExperience: profileForm.isFresher ? [] : workExperiences });
    alert("Experience saved successfully!");
  };

  const handleSaveURLs = () => {
    alert("URLs saved successfully!");
  };

  const SectionCard = ({ title, icon: Icon, children, onSave, saveText, headerAction }: any) => (
    <GlassCard padding="lg" className="w-full flex flex-col mb-6 bg-black/30 backdrop-blur-2xl border border-white/5 rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
          <Icon className="w-4 h-4 text-[#d6cdb5]" />
          <span className="text-[10px] font-bold tracking-[0.15em] text-gray-300 uppercase mt-0.5">{title}</span>
        </div>
        {headerAction}
      </div>
      <div className="flex-1">
        {children}
      </div>
      {onSave && (
        <div className="flex justify-end mt-8 border-t border-white/5 pt-6">
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onSave(); }}
            className="flex items-center justify-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-[13px] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)]"
          >
            {saveText}
          </button>
        </div>
      )}
    </GlassCard>
  );

  const InputField = ({ label, ...props }: any) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[11px] text-gray-300 ml-1">{label}</label>
      <input
        {...props}
        className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-[13px] focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 pt-4">
      {/* Header */}
      <div className="mb-10 pl-2">
        <h1 className="text-4xl text-white font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Hello, <span className="text-[#e8d5c4] not-italic">{mounted ? (user?.firstName || "Pranav") : "Pranav"}</span>.
        </h1>
      </div>

      <div className="space-y-6">
        {/* Introduction Section */}
        <SectionCard 
          title="Introduction" 
          icon={User} 
          saveText="Save Introduction"
          onSave={handleSaveIntroduction}
        >
          <div className="flex flex-col gap-2 w-full">
            <textarea
              value={profileForm.introduction}
              onChange={(e) => setProfileForm({...profileForm, introduction: e.target.value})}
              className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-5 text-white text-[13px] focus:outline-none focus:border-white/20 placeholder:text-gray-600 min-h-[140px] transition-colors resize-none leading-relaxed"
              placeholder="Tell us about yourself, your background, and your goals..."
            />
          </div>
        </SectionCard>

        {/* Professional Profile Section */}
        <SectionCard 
          title="Professional Profile" 
          icon={Briefcase} 
          saveText="Save Profile"
          onSave={handleSaveProfile}
          headerAction={
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${profileForm.isFresher ? 'bg-[#d6cdb5] border-[#d6cdb5]' : 'border-white/10 bg-transparent group-hover:border-white/30'}`}>
                {profileForm.isFresher && <X className="w-3 h-3 text-black" />}
              </div>
              <input 
                type="checkbox" 
                checked={profileForm.isFresher}
                onChange={(e) => setProfileForm({...profileForm, isFresher: e.target.checked})}
                className="hidden"
              />
              <span className="text-[12px] font-medium text-gray-400 group-hover:text-gray-300 transition-colors">I am a Fresher</span>
            </label>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {!profileForm.isFresher && (
              <InputField
                label="Years of Experience"
                placeholder="e.g. 5"
                type="number"
                min="0"
                value={profileForm.experience}
                onChange={(e: any) => setProfileForm({...profileForm, experience: e.target.value})}
              />
            )}
            <InputField
              label="Primary Tech Stack"
              placeholder="e.g. React, Node.js"
              value={profileForm.techStack}
              onChange={(e: any) => setProfileForm({...profileForm, techStack: e.target.value})}
            />
            <InputField
              label="Key Skills"
              placeholder="e.g. System Design, Agile"
              value={profileForm.keySkills}
              onChange={(e: any) => setProfileForm({...profileForm, keySkills: e.target.value})}
            />
            <InputField
              label="Languages Known"
              placeholder="e.g. English, Spanish"
              value={profileForm.languages}
              onChange={(e: any) => setProfileForm({...profileForm, languages: e.target.value})}
            />
          </div>
        </SectionCard>

        {/* Work Experience Section */}
        {!profileForm.isFresher && (
          <SectionCard 
            title="Work Experience" 
            icon={Briefcase} 
            saveText="Save Experience"
            onSave={handleSaveExperience}
            headerAction={
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setWorkExperiences([...workExperiences, { company: "", role: "", duration: "" }]);
                }}
                className="flex items-center gap-1.5 text-[#d6cdb5] hover:text-[#e8d5c4] transition-colors text-[12px] font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Add Experience
              </button>
            }
          >
            <div className="space-y-4">
              {workExperiences.length === 0 ? (
                <div className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-4 py-12 flex items-center justify-center">
                  <p className="text-[13px] text-gray-500">No work experience added yet.</p>
                </div>
              ) : (
                workExperiences.map((exp, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-5 items-end bg-[#111318]/50 border border-white/5 p-5 rounded-xl relative group">
                    <div className="flex-1 w-full">
                      <InputField
                        label="Company"
                        placeholder="e.g. Google"
                        value={exp.company}
                        onChange={(e: any) => {
                          const newExp = [...workExperiences];
                          newExp[index].company = e.target.value;
                          setWorkExperiences(newExp);
                        }}
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <InputField
                        label="Role / Post"
                        placeholder="e.g. Software Engineer"
                        value={exp.role}
                        onChange={(e: any) => {
                          const newExp = [...workExperiences];
                          newExp[index].role = e.target.value;
                          setWorkExperiences(newExp);
                        }}
                      />
                    </div>
                    <div className="flex-1 w-full">
                      <InputField
                        label="Duration (Years)"
                        placeholder="e.g. 2 Years"
                        value={exp.duration}
                        onChange={(e: any) => {
                          const newExp = [...workExperiences];
                          newExp[index].duration = e.target.value;
                          setWorkExperiences(newExp);
                        }}
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        const newExp = workExperiences.filter((_, i) => i !== index);
                        setWorkExperiences(newExp);
                      }}
                      className="p-3 mb-1 text-gray-600 hover:text-[#e8d5c4] hover:bg-white/5 rounded-xl transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </SectionCard>
        )}

        {/* Professional URLs Section */}
        <SectionCard 
          title="Professional URLs" 
          icon={LinkIcon}
        >
          <div className="space-y-5">
            <InputField
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/username"
              value={profileForm.linkedin}
              onChange={(e: any) => setProfileForm({...profileForm, linkedin: e.target.value})}
            />
            <InputField
              label="GitHub Profile"
              placeholder="https://github.com/username"
              value={profileForm.github}
              onChange={(e: any) => setProfileForm({...profileForm, github: e.target.value})}
            />
            <InputField
              label="Portfolio/Website"
              placeholder="https://yourportfolio.com"
              value={profileForm.portfolio}
              onChange={(e: any) => setProfileForm({...profileForm, portfolio: e.target.value})}
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
