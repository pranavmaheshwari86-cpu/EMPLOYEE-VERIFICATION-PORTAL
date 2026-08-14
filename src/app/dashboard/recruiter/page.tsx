"use client";

import React, { useState, useEffect, useRef } from "react";
import { User, Building2, Link as LinkIcon, Plus, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { GlassCard } from "@/components/ui/glass-card";

const SectionCard = ({ title, icon: Icon, children, onSave, saveText, headerAction }: any) => (
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
      <div className="flex justify-end mt-8 border-t border-white/5 pt-6">
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.preventDefault(); onSave(); }}
          className="flex items-center justify-center gap-2 py-2.5 px-6 rounded-full bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-sm hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,213,196,0.15)]"
        >
          {saveText}
        </button>
      </div>
    )}
  </GlassCard>
);

const InputField = ({ label, ...props }: any) => (
  <div className="flex flex-col gap-2 w-full">
    <label className="text-sm text-gray-300 ml-1">{label}</label>
    <input
      {...props}
      className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 transition-colors"
    />
  </div>
);

const CompanyIntroductionSection = ({ user, updateUser }: any) => {
  const aboutRef = useRef(user?.companyDescription || "");

  const handleSave = async () => {
    try {
      await updateUser({ companyDescription: aboutRef.current });
      alert("Introduction saved successfully!");
    } catch (e) {
      alert("Failed to save introduction.");
    }
  };

  return (
    <SectionCard title="Company Introduction" icon={User} saveText="Save Introduction" onSave={handleSave}>
      <div className="flex flex-col gap-2 w-full">
        <label className="text-sm text-gray-300 ml-1">About the Company</label>
        <textarea
          defaultValue={user?.companyDescription || ""}
          onChange={(e) => { aboutRef.current = e.target.value; }}
          className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-5 text-white text-base focus:outline-none focus:border-white/20 placeholder:text-gray-600 min-h-[140px] transition-colors resize-none leading-relaxed"
          placeholder="Tell us about your company, your background, and your goals..."
        />
      </div>
    </SectionCard>
  );
};

const CompanyDetailsSection = ({ user, updateUser }: any) => {
  const [employees, setEmployees] = useState(user?.contactDetails?.employees || "");
  const [hqItems, setHqItems] = useState<{id: number, val: string}[]>(
    (user?.contactDetails?.headquarters || [""]).map((hq: string, i: number) => ({ id: i, val: hq }))
  );
  
  const hqRef = useRef<Record<number, string>>({});

  useEffect(() => {
    hqItems.forEach(item => {
      if (hqRef.current[item.id] === undefined) hqRef.current[item.id] = item.val;
    });
  }, [hqItems]);

  const handleSave = async () => {
    const headquarters = hqItems.map(item => hqRef.current[item.id] || item.val).filter(Boolean);
    try {
      await updateUser({ contactDetails: { employees, headquarters } });
      alert("Company details saved successfully!");
    } catch (e) {
      alert("Failed to save company details.");
    }
  };

  return (
    <SectionCard 
      title="Company Details" 
      icon={Building2} 
      saveText="Save Details"
      onSave={handleSave}
      headerAction={
        <button
          onClick={(e: React.MouseEvent) => { 
            e.preventDefault(); 
            setHqItems([...hqItems, { id: Date.now(), val: "" }]); 
          }}
          className="flex items-center gap-1.5 text-[#d6cdb5] hover:text-[#e8d5c4] transition-colors text-sm font-medium"
        >
          <Plus className="w-3.5 h-3.5" /> Add Headquarter
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm text-gray-300 ml-1">Number of Employees</label>
          <select
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
            className="w-full bg-[#111318]/50 border border-white/5 rounded-xl px-5 py-3.5 text-white text-base focus:outline-none focus:border-white/20 transition-colors appearance-none"
          >
            <option value="" disabled>e.g. 11-50</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1000+">1000+</option>
          </select>
        </div>
        
        <div className="flex flex-col gap-4 md:col-span-3">
          <div className="space-y-4">
            {hqItems.map((hq) => (
              <div key={hq.id} className="flex flex-col md:flex-row gap-5 items-end bg-[#111318]/50 border border-white/5 p-5 rounded-xl relative group">
                <div className="flex-1 w-full">
                  <InputField
                    label="Headquarters"
                    placeholder="e.g. San Francisco, CA"
                    defaultValue={hq.val}
                    onChange={(e: any) => {
                      hqRef.current[hq.id] = e.target.value;
                    }}
                  />
                </div>
                {hqItems.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => {
                      setHqItems(hqItems.filter(i => i.id !== hq.id));
                      delete hqRef.current[hq.id];
                    }}
                    className="p-3 mb-1 text-gray-600 hover:text-[#e8d5c4] hover:bg-white/5 rounded-xl transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

const OfficialLinksSection = ({ user, updateUser }: any) => {
  const lnRef = useRef(user?.socialLinks?.[0] || "");
  const twRef = useRef(user?.socialLinks?.[1] || "");
  const igRef = useRef(user?.socialLinks?.[2] || "");
  const fbRef = useRef(user?.socialLinks?.[3] || "");

  const handleSave = async () => {
    try {
      await updateUser({ socialLinks: [lnRef.current, twRef.current, igRef.current, fbRef.current] });
      alert("Links saved successfully!");
    } catch (e) {
      alert("Failed to save links.");
    }
  };

  return (
    <SectionCard title="Official Links" icon={LinkIcon} saveText="Save Links" onSave={handleSave}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <InputField
          label="LinkedIn Profile"
          placeholder="https://linkedin.com/company/username"
          defaultValue={user?.socialLinks?.[0] || ""}
          onChange={(e: any) => { lnRef.current = e.target.value; }}
        />
        <InputField
          label="X / Twitter Profile"
          placeholder="https://x.com/username"
          defaultValue={user?.socialLinks?.[1] || ""}
          onChange={(e: any) => { twRef.current = e.target.value; }}
        />
        <InputField
          label="Instagram Profile"
          placeholder="https://instagram.com/username"
          defaultValue={user?.socialLinks?.[2] || ""}
          onChange={(e: any) => { igRef.current = e.target.value; }}
        />
        <InputField
          label="Facebook Profile"
          placeholder="https://facebook.com/username"
          defaultValue={user?.socialLinks?.[3] || ""}
          onChange={(e: any) => { fbRef.current = e.target.value; }}
        />
      </div>
    </SectionCard>
  );
};

export default function RecruiterDashboardPage() {
  const { user, updateUser } = useAppStore();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 pt-4">
      {/* Header */}
      <div className="mb-10 pl-2">
        <h1 className="text-4xl text-white font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
          Hello, <span className="text-[#e8d5c4] not-italic capitalize">{user?.companyName || "company"}</span>.
        </h1>
      </div>

      <div className="space-y-6">
        <CompanyIntroductionSection user={user} updateUser={updateUser} />
        <CompanyDetailsSection user={user} updateUser={updateUser} />
        <OfficialLinksSection user={user} updateUser={updateUser} />
      </div>
    </div>
  );
}
