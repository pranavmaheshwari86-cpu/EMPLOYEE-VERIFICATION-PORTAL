"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";
import { User, Briefcase, Link as LinkIcon, Plus, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const SectionCard = ({ title, icon: Icon, children, onSave, saveText, headerAction, isInitiallySaved = false }: any) => {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  const [hasSavedOnce, setHasSavedOnce] = useState(isInitiallySaved);

  useEffect(() => {
    if (isInitiallySaved) setHasSavedOnce(true);
  }, [isInitiallySaved]);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (status === "saving") return;
    setStatus("saving");

    let isDone = false;
    const fallbackTimer = setTimeout(() => {
      if (!isDone) {
        setStatus("idle");
      }
    }, 3500);

    try {
      const res = await onSave();
      isDone = true;
      clearTimeout(fallbackTimer);

      if (res === false) {
        setStatus("idle");
      } else {
        setStatus("saved");
        setHasSavedOnce(true);
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch (error) {
      isDone = true;
      clearTimeout(fallbackTimer);
      setStatus("idle");
    }
  };

  return (
    <GlassCard padding="lg" className="w-full flex flex-col mb-6 bg-black/30 backdrop-blur-2xl border border-white/5 rounded-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
          <Icon className="w-4 h-4 text-[#d6cdb5]" />
          <span className="text-xs font-bold tracking-[0.15em] text-gray-300 uppercase mt-0.5">{title}</span>
        </div>
        {headerAction}
      </div>
      <div className="flex-1">
        {children}
      </div>
      {onSave && (
        <div className="flex justify-end mt-8 border-t border-white/5 pt-6 gap-3">
          {hasSavedOnce && status !== "saving" && (
            <button
              disabled
              className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-sm shadow-[0_0_20px_rgba(34,197,94,0.1)] cursor-default"
            >
              Saved ✓
            </button>
          )}
          <button
            onClick={handleSaveClick}
            disabled={status === "saving"}
            className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)] disabled:opacity-50"
          >
            {status === "saving" ? "Saving..." : (hasSavedOnce ? "Update" : saveText)}
          </button>
        </div>
      )}
    </GlassCard>
  );
};

const InputField = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm text-gray-300 ml-1">{label}</label>
    <input
      {...props}
      className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors"
    />
  </div>
);

const IntroductionSection = ({ user, updateUser }: any) => {
  const introRef = useRef(user?.introduction || "");

  const handleSave = async () => {
    const introduction = introRef.current;
    if (!introduction.trim()) {
      alert("Introduction is compulsory!");
      return false;
    }
    try {
      await updateUser({ introduction });
      return true;
    } catch (e) {
      alert("Failed to save introduction. Please try again.");
      return false;
    }
  };

  return (
    <SectionCard title="Introduction" icon={User} saveText="Save Introduction" onSave={handleSave} isInitiallySaved={!!user?.introduction}>
      <div className="flex flex-col gap-2 w-full">
        <textarea
          defaultValue={user?.introduction || ""}
          onChange={(e) => { introRef.current = e.target.value; }}
          className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 min-h-[140px] transition-colors resize-none leading-relaxed"
          placeholder="Tell us about yourself, your background, and your goals..."
        />
      </div>
    </SectionCard>
  );
};

const ProfessionalProfileSection = ({ user, updateUser }: any) => {
  const [isFresher, setIsFresher] = useState(user?.isFresher || false);
  const expRef = useRef(user?.experience?.toString() || "");
  const techRef = useRef(user?.techStack?.join(", ") || "");
  const skillsRef = useRef(user?.keySkills?.join(", ") || user?.techStack?.join(", ") || "");
  const langRef = useRef(user?.languages?.join(", ") || "");

  const handleSave = async () => {
    const techStack = techRef.current;
    const keySkills = skillsRef.current;
    const languages = langRef.current;
    const experience = expRef.current;

    if (!techStack.trim() || !keySkills.trim() || !languages.trim()) {
      alert("Tech Stack, Key Skills, and Languages are compulsory!");
      return false;
    }
    if (!isFresher && !experience.trim()) {
      alert("Years of Experience is compulsory for non-freshers!");
      return false;
    }
    try {
      await updateUser({
        isFresher,
        experience: isFresher ? 0 : parseInt(experience) || undefined,
        techStack: techStack.split(",").map((s: string) => s.trim()).filter(Boolean),
        keySkills: keySkills.split(",").map((s: string) => s.trim()).filter(Boolean),
        languages: languages.split(",").map((s: string) => s.trim()).filter(Boolean)
      });
      return true;
    } catch (e) {
      alert("Failed to save profile. Please try again.");
      return false;
    }
  };

  return (
    <SectionCard 
      title="Professional Profile" 
      icon={Briefcase} 
      saveText="Save Profile"
      onSave={handleSave}
      isInitiallySaved={!!(user?.techStack?.length || user?.experience !== undefined)}
      headerAction={
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${isFresher ? 'bg-[#d6cdb5] border-[#d6cdb5]' : 'border-white/10 bg-transparent group-hover:border-white/30'}`}>
            {isFresher && <X className="w-3 h-3 text-black" />}
          </div>
          <input 
            type="checkbox" 
            checked={isFresher}
            onChange={(e) => setIsFresher(e.target.checked)}
            className="hidden"
          />
          <span className="text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors">I am a Fresher</span>
        </label>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {!isFresher && (
          <InputField
            label="Years of Experience"
            placeholder="e.g. 5"
            type="number"
            min="0"
            defaultValue={user?.experience?.toString() || ""}
            onChange={(e: any) => { expRef.current = e.target.value; }}
          />
        )}
        <InputField
          label="Primary Tech Stack"
          placeholder="e.g. React, Node.js"
          defaultValue={user?.techStack?.join(", ") || ""}
          onChange={(e: any) => { techRef.current = e.target.value; }}
        />
        <InputField
          label="Key Skills"
          placeholder="e.g. System Design, Agile"
          defaultValue={user?.keySkills?.join(", ") || user?.techStack?.join(", ") || ""}
          onChange={(e: any) => { skillsRef.current = e.target.value; }}
        />
        <InputField
          label="Languages Known"
          placeholder="e.g. English, Spanish"
          defaultValue={user?.languages?.join(", ") || ""}
          onChange={(e: any) => { langRef.current = e.target.value; }}
        />
      </div>
    </SectionCard>
  );
};

const WorkExperienceSection = ({ user, updateUser }: any) => {
  const [items, setItems] = useState<{id: number, company: string, role: string, duration: string}[]>(
    (user?.workExperience || []).map((exp: any, i: number) => ({ ...exp, id: i }))
  );
  
  // We use a ref to track the latest input values without triggering re-renders
  const valuesRef = useRef<Record<number, {company: string, role: string, duration: string}>>({});
  
  // Initialize values ref from items
  useEffect(() => {
    items.forEach(item => {
      if (!valuesRef.current[item.id]) {
        valuesRef.current[item.id] = { company: item.company, role: item.role, duration: item.duration };
      }
    });
  }, [items]);

  if (user?.isFresher) return null;

  const handleSave = async () => {
    if (items.length === 0) {
      alert("Work Experience is compulsory for non-freshers!");
      return false;
    }
    
    const finalData = items.map(item => ({
      company: valuesRef.current[item.id]?.company || item.company,
      role: valuesRef.current[item.id]?.role || item.role,
      duration: valuesRef.current[item.id]?.duration || item.duration
    }));

    for (const exp of finalData) {
      if (!exp.company.trim() || !exp.role.trim() || !exp.duration.trim()) {
        alert("All fields in Work Experience are compulsory!");
        return false;
      }
    }
    try {
      await updateUser({ workExperience: finalData });
      return true;
    } catch (e) {
      alert("Failed to save experience. Please try again.");
      return false;
    }
  };

  return (
    <SectionCard 
      title="Work Experience" 
      icon={Briefcase} 
      saveText="Save Experience"
      onSave={handleSave}
      isInitiallySaved={!!(user?.workExperience && user.workExperience.length > 0)}
      headerAction={
        <button
          onClick={(e) => {
            e.preventDefault();
            setItems([...items, { id: Date.now(), company: "", role: "", duration: "" }]);
          }}
          className="flex items-center gap-1.5 text-[#d6cdb5] hover:text-[#e8d5c4] transition-colors text-sm font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      }
    >
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-4 py-12 flex items-center justify-center">
            <p className="text-base text-gray-500">No work experience added yet.</p>
          </div>
        ) : (
          items.map((exp) => (
            <div key={exp.id} className="flex flex-col md:flex-row gap-5 items-end bg-[#111318]/50 border border-white/5 p-5 rounded-xl relative group">
              <div className="flex-1 w-full">
                <InputField
                  label="Company"
                  placeholder="e.g. Google"
                  defaultValue={exp.company}
                  onChange={(e: any) => { 
                    if(!valuesRef.current[exp.id]) valuesRef.current[exp.id] = {company: "", role: "", duration: ""};
                    valuesRef.current[exp.id].company = e.target.value; 
                  }}
                />
              </div>
              <div className="flex-1 w-full">
                <InputField
                  label="Role / Post"
                  placeholder="e.g. Software Engineer"
                  defaultValue={exp.role}
                  onChange={(e: any) => { 
                    if(!valuesRef.current[exp.id]) valuesRef.current[exp.id] = {company: "", role: "", duration: ""};
                    valuesRef.current[exp.id].role = e.target.value; 
                  }}
                />
              </div>
              <div className="flex-1 w-full">
                <InputField
                  label="Duration (Years)"
                  placeholder="e.g. 2 Years"
                  defaultValue={exp.duration}
                  onChange={(e: any) => { 
                    if(!valuesRef.current[exp.id]) valuesRef.current[exp.id] = {company: "", role: "", duration: ""};
                    valuesRef.current[exp.id].duration = e.target.value; 
                  }}
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setItems(items.filter(i => i.id !== exp.id));
                  delete valuesRef.current[exp.id];
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
  );
};

const ProfessionalURLsSection = ({ user, updateUser }: any) => {
  const inRef = useRef(user?.linkedin || "");
  const ghRef = useRef(user?.github || "");
  const ptRef = useRef(user?.portfolio || "");

  const handleSave = async () => {
    try {
      await updateUser({ linkedin: inRef.current, github: ghRef.current, portfolio: ptRef.current });
      return true;
    } catch (e) {
      alert("Failed to save URLs. Please try again.");
      return false;
    }
  };

  return (
    <SectionCard title="Professional URLs" icon={LinkIcon} saveText="Save URLs" onSave={handleSave} isInitiallySaved={!!(user?.linkedin || user?.github || user?.portfolio)}>
      <div className="space-y-5">
        <InputField
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/in/username"
          defaultValue={user?.linkedin || ""}
          onChange={(e: any) => { inRef.current = e.target.value; }}
        />
        <InputField
          label="GitHub Profile"
          placeholder="https://github.com/username"
          defaultValue={user?.github || ""}
          onChange={(e: any) => { ghRef.current = e.target.value; }}
        />
        <InputField
          label="Portfolio/Website"
          placeholder="https://yourportfolio.com"
          defaultValue={user?.portfolio || ""}
          onChange={(e: any) => { ptRef.current = e.target.value; }}
        />
      </div>
    </SectionCard>
  );
};

export default function EmployeeDashboardPage() {
  const { user, updateUser } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate a stable key that changes when user data hydrates from localStorage.
  // This forces defaultValue-based components to re-mount with the correct data.
  const userDataKey = user?.id ? `${user.id}-${user.introduction ? '1' : '0'}-${user.techStack?.length || 0}` : 'loading';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 pt-4">
      {/* Header */}
      <div className="mb-10 pl-2">
        <h1 className="text-4xl text-white font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Hello, <span className="text-[#e8d5c4] not-italic capitalize">{mounted ? (user?.firstName || "Pranav") : "Pranav"}</span>.
        </h1>
      </div>

      <div className="space-y-6" key={userDataKey}>
        <IntroductionSection user={user} updateUser={updateUser} />
        <ProfessionalProfileSection user={user} updateUser={updateUser} />
        <WorkExperienceSection user={user} updateUser={updateUser} />
        <ProfessionalURLsSection user={user} updateUser={updateUser} />
      </div>
    </div>
  );
}
