"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { ArrowUpRight, User, Briefcase, Code, Globe, Building, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isAuthenticated, hasProfile, createProfile, isLoading } = useAppStore();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState<number>(0);
  const [techStackInput, setTechStackInput] = useState("");
  const [languagesInput, setLanguagesInput] = useState("English");
  const [isFresher, setIsFresher] = useState(false);

  // Recruiter fields
  const [companyName, setCompanyName] = useState(user?.companyName || "");
  const [website, setWebsite] = useState(user?.website || "");
  const [industry, setIndustry] = useState(user?.industryType || "Technology");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    if (hasProfile) {
      const role = user?.role || "EMPLOYEE";
      router.push(`/dashboard/${role.toLowerCase()}`);
    }
  }, [isAuthenticated, hasProfile, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName) {
      toast.error("Please enter your first name");
      return;
    }

    try {
      const role = user?.role || "EMPLOYEE";
      if (role === "EMPLOYEE") {
        const techStack = techStackInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const languages = languagesInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        await createProfile({
          firstName,
          lastName,
          introduction: bio,
          experience: Number(experience),
          techStack,
          languages: languages.length > 0 ? languages : ["English"],
          isFresher,
        });
      } else {
        await createProfile({
          firstName,
          lastName,
          companyName,
          website,
          industryType: industry,
        });
      }

      toast.success("Profile created successfully!");
      router.push(`/dashboard/${role.toLowerCase()}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create profile");
    }
  };

  if (!isAuthenticated || hasProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#131313] text-white">
        <div className="animate-pulse">Loading setup environment...</div>
      </div>
    );
  }

  const role = user?.role || "EMPLOYEE";

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden bg-[#131313] text-white font-body">
      <main className="relative z-10 w-full max-w-[650px] animate-in fade-in zoom-in duration-500">
        <GlassCard padding="xl" className="w-full liquid-glass flex flex-col items-center text-left">
          
          <div className="flex items-center gap-3 mb-6 bg-white/5 border border-white/20 px-6 py-3 rounded-full">
            <img src="/logo.png" alt="Aetheris Logo" className="w-8 h-8 object-contain" />
            <span className="text-xl tracking-[0.3em] text-white font-medium">AETHERIS ONBOARDING</span>
          </div>

          <h1 className="font-heading italic text-3xl md:text-4xl text-white mb-2 text-center">
            Welcome to Aetheris
          </h1>
          <p className="font-body text-[#c4c7c8] text-center mb-8 max-w-md">
            You don't have an active application profile yet. Let's set up your profile to personalize your experience.
          </p>

          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">First Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jane"
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Last Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Fields */}
            {role === "EMPLOYEE" ? (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Professional Bio / Introduction</label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Describe your engineering domain, specialization, or career summary..."
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Years of Experience</label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={experience}
                        onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
                        className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="flex items-center pt-6">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isFresher}
                        onChange={(e) => setIsFresher(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 accent-blue-500 cursor-pointer"
                      />
                      <span className="text-sm text-[#c4c7c8]">I am a fresher / student</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Primary Tech Stack (comma separated)</label>
                  <div className="relative">
                    <Code className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={techStackInput}
                      onChange={(e) => setTechStackInput(e.target.value)}
                      placeholder="TypeScript, Next.js, React, Node.js"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Languages Known</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={languagesInput}
                      onChange={(e) => setLanguagesInput(e.target.value)}
                      placeholder="English, Spanish"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Company Name</label>
                  <div className="relative">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Company Website</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://acme.com"
                      className="w-full bg-black/30 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c4c7c8] mb-2 font-medium">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="Software / Artificial Intelligence"
                    className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
              </>
            )}

            <GlassButton
              type="submit"
              disabled={isLoading}
              variant="primary"
              className="w-full py-4 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.15)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] mt-4"
            >
              {isLoading ? "CREATING PROFILE..." : (
                <>CREATE YOUR PROFILE <ArrowUpRight className="w-4 h-4 ml-2" /></>
              )}
            </GlassButton>
          </form>
        </GlassCard>
      </main>
    </div>
  );
}
