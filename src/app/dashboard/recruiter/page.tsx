"use client";

import React, { useState } from "react";
import { User, Building2, Link as LinkIcon, Plus, X } from "lucide-react";
import { useAppStore } from "@/lib/store";

export default function RecruiterDashboardPage() {
  const { user } = useAppStore();
  const [companyData, setCompanyData] = useState({
    about: "",
    employees: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: ""
  });
  const [headquarters, setHeadquarters] = useState<string[]>([""]);

  const handleAddHeadquarter = () => {
    setHeadquarters([...headquarters, ""]);
  };

  const handleRemoveHeadquarter = (index: number) => {
    const newHq = [...headquarters];
    newHq.splice(index, 1);
    setHeadquarters(newHq);
  };

  const handleHqChange = (index: number, value: string) => {
    const newHq = [...headquarters];
    newHq[index] = value;
    setHeadquarters(newHq);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const SectionCard = ({ title, icon: Icon, children, onSave, saveText }: any) => (
    <div className="border border-white/10 rounded-sm bg-transparent p-6 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Icon className="w-5 h-5 text-cyan-400" />
        <h2 className="text-lg font-medium text-white">{title}</h2>
      </div>
      <div className="flex-1">
        {children}
      </div>
      <div className="flex justify-end mt-8 border-t border-white/5 pt-6">
        <button
          onClick={(e) => { e.preventDefault(); onSave(); }}
          className="bg-[#042024]/60 text-cyan-400 border border-cyan-800/50 hover:bg-[#042024] transition-colors px-6 py-2 rounded-full text-sm font-medium"
        >
          {saveText}
        </button>
      </div>
    </div>
  );

  const InputField = ({ label, ...props }: any) => (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-xs text-gray-400">{label}</label>
      <input
        {...props}
        className="w-full bg-[#111111] border border-white/5 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600 transition-colors"
      />
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 pt-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl text-white font-serif italic">
          Hello, <span className="text-cyan-400">{user?.companyName || "company"}.</span>
        </h1>
      </div>

      <div className="space-y-4">
        {/* Introduction Section */}
        <SectionCard 
          title="Company Introduction" 
          icon={User} 
          saveText="Save Introduction"
          onSave={() => console.log("Saved intro")}
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-400">About the Company</label>
              <textarea
                name="about"
                value={companyData.about}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/5 rounded-2xl px-4 py-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600 min-h-[120px] transition-colors"
                placeholder="Tell us about your company, your background, and your goals..."
              />
            </div>
          </div>
        </SectionCard>

        {/* Professional Profile Section */}
        <SectionCard 
          title="Company Details" 
          icon={Building2} 
          saveText="Save Details"
          onSave={() => console.log("Saved details")}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-xs text-gray-400">Number of Employees</label>
              <select
                name="employees"
                value={companyData.employees}
                onChange={handleChange}
                className="w-full bg-[#111111] border border-white/5 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none"
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
            
            <div className="flex flex-col gap-4 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {headquarters.map((hq, index) => (
                  <div key={index} className="flex flex-col gap-2 w-full">
                    <label className="text-xs text-gray-400">Headquarters {index + 1}</label>
                    <div className="flex items-center gap-2">
                      <input
                        placeholder="e.g. San Francisco, CA"
                        value={hq}
                        onChange={(e) => handleHqChange(index, e.target.value)}
                        className="w-full bg-[#111111] border border-white/5 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 placeholder:text-gray-600 transition-colors"
                      />
                      {headquarters.length > 1 && (
                        <button 
                          type="button"
                          onClick={() => handleRemoveHeadquarter(index)}
                          className="p-3 shrink-0 rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={handleAddHeadquarter}
                className="flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors self-start mt-2 px-2"
              >
                <Plus className="w-3 h-3" /> Add another headquarter
              </button>
            </div>
          </div>
        </SectionCard>

        {/* Professional URLs Section */}
        <SectionCard 
          title="Official Links" 
          icon={LinkIcon} 
          saveText="Save Links"
          onSave={() => console.log("Saved links")}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="LinkedIn Profile"
              name="linkedin"
              placeholder="https://linkedin.com/company/username"
              value={companyData.linkedin}
              onChange={handleChange}
            />
            <InputField
              label="X / Twitter Profile"
              name="twitter"
              placeholder="https://x.com/username"
              value={companyData.twitter}
              onChange={handleChange}
            />
            <InputField
              label="Instagram Profile"
              name="instagram"
              placeholder="https://instagram.com/username"
              value={companyData.instagram}
              onChange={handleChange}
            />
            <InputField
              label="Facebook Profile"
              name="facebook"
              placeholder="https://facebook.com/username"
              value={companyData.facebook}
              onChange={handleChange}
            />
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
