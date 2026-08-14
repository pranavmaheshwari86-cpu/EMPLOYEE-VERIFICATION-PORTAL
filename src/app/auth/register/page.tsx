"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { Mail, Lock, User, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore, UserRole } from "@/lib/store";
import toast from "react-hot-toast";
import { createBrowserClient } from "@supabase/ssr";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, isLoading } = useAppStore();
  
  const initialRole = (searchParams.get("role") as UserRole) || "EMPLOYEE";
  const [role, setRole] = useState<UserRole>(initialRole);
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const handleSocialLogin = async (provider: string) => {
    toast.loading(`Connecting to ${provider}...`, { id: "auth" });
    try {
      // DEV BYPASS for OAuth
      if (process.env.NODE_ENV === 'development') {
        setTimeout(async () => {
          try {
            await register({
              firstName: "Test",
              lastName: "User",
              email: `test-${Date.now()}@example.com`,
              password: "Password123!",
              role: role,
              ...(role === "RECRUITER" && {
                companyName: "Test Company",
                website: "https://example.com",
                industryType: "Technology & Software",
                location: "New York, USA",
                officialEmail: `test-${Date.now()}@example.com`,
                hrName: "HR Representative"
              }),
            });
            toast.success(`Mock ${provider} registration successful!`, { id: "auth" });
            if (role === "RECRUITER") {
              router.push("/dashboard/recruiter");
            } else {
              router.push("/dashboard/employee");
            }
          } catch (err: any) {
            toast.error(err.message || "Failed to register", { id: "auth" });
          }
        }, 800);
        return;
      }

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider.toLowerCase() as any,
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=${role}`,
        },
      });

      if (error) throw error;
    } catch (error) {
      toast.error(`Failed to connect to ${provider}`, { id: "auth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill in all required fields.");
      return;
    }
    
    if (role === "RECRUITER" && !companyName) {
      setError("Company Name is required for employers.");
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        role,
        ...(role === "RECRUITER" && {
          companyName,
          website,
          industryType,
          location,
          officialEmail: email,
          hrName: "HR Representative"
        }),
      });
      
      if (role === "RECRUITER") {
        router.push("/dashboard/recruiter");
      } else {
        router.push("/dashboard/employee");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <GlassCard padding="lg" className="w-full liquid-glass">
      <div className="text-center mb-10">
        <h1 
          className="font-display italic text-white tracking-tight" 
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textShadow: "0 4px 20px rgba(0,0,0,0.5)" }}
        >
          Join the Aetheris hiring network
        </h1>
        <p className="text-xl text-aetheris-muted mt-2">Join the AI-native verification network.</p>
      </div>



      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="p-3 text-sm text-aetheris-rose bg-aetheris-rose/10 border border-aetheris-rose/20 rounded-xl">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <GlassInput
            label="First Name"
            icon={User}
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <GlassInput
            label="Last Name"
            icon={User}
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        {role === "RECRUITER" && (
          <GlassInput
            label="Company Name"
            icon={Briefcase}
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        )}
        
        <GlassInput
          label={role === "RECRUITER" ? "Work Email Address" : "Primary Email Address"}
          type="email"
          icon={Mail}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        {role === "RECRUITER" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Website URL"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <div className="relative w-full pt-8">
                <div className="relative group">
                  <select
                    className="w-full bg-[#161616]/80 backdrop-blur-[20px] border border-white/5 rounded-[2rem] px-6 py-4 text-aetheris-white text-lg transition-all duration-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),_0_4px_12px_rgba(0,0,0,0.5)] focus:outline-none focus:bg-[#2a2a2a]/60 focus:border-white/15 focus:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),_0_0_20px_rgba(255,255,255,0.03)] appearance-none cursor-pointer"
                    value={industryType}
                    onChange={(e) => setIndustryType(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>Select industry</option>
                    <option value="Technology & Software" className="bg-[#161616]">Technology & Software (or IT Services, SaaS, Web3)</option>
                    <option value="Finance & Fintech" className="bg-[#161616]">Finance & Fintech</option>
                    <option value="Healthcare & Healthtech" className="bg-[#161616]">Healthcare & Healthtech</option>
                    <option value="E-commerce & Retail" className="bg-[#161616]">E-commerce & Retail</option>
                    <option value="Manufacturing & Logistics" className="bg-[#161616]">Manufacturing & Logistics</option>
                    <option value="Education & EdTech" className="bg-[#161616]">Education & EdTech</option>
                    <option value="Media & Entertainment" className="bg-[#161616]">Media & Entertainment</option>
                    <option value="Consulting & Professional Services" className="bg-[#161616]">Consulting & Professional Services</option>
                    <option value="Real Estate & PropTech" className="bg-[#161616]">Real Estate & PropTech</option>
                    <option value="Energy & Sustainability" className="bg-[#161616]">Energy & Sustainability</option>
                  </select>
                  
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-aetheris-muted">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>

                  <label className="absolute left-4 top-4 text-base text-aetheris-cyan/80 pointer-events-none origin-left -translate-y-11 scale-[0.85]">
                    Industry Type <span className="text-aetheris-rose ml-1">*</span>
                  </label>
                </div>
              </div>
            </div>
            <GlassInput
              label="Company Location"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </>
        )}
        
        <GlassInput
          label="Password"
          type="password"
          icon={Lock}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="pt-4">
          <GlassButton 
            type="submit" 
            variant="primary" 
            className="w-full py-3.5 text-lg group hover:scale-105 hover:brightness-110 hover:shadow-glow-cyan transition-all duration-300" 
            icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            loading={isLoading}
          >
            Complete Registration
          </GlassButton>
        </div>
      </form>

      <div className="w-full flex items-center gap-3 mt-7 mb-5">
        <div className="flex-1 h-[1px] bg-white/5"></div>
        <span className="text-[12px] text-aetheris-muted font-bold tracking-[0.1em] uppercase">Or continue with</span>
        <div className="flex-1 h-[1px] bg-white/5"></div>
      </div>

      <div className="w-full flex gap-3 mb-6">
        <button 
          type="button" 
          onClick={() => handleSocialLogin("Google")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>
        <button 
          type="button" 
          onClick={() => handleSocialLogin("LinkedIn")}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white text-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
        >
          <svg className="w-5 h-5" fill="#0A66C2" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </button>
      </div>

      <div className="text-center text-base text-aetheris-muted">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-white hover:text-aetheris-cyan transition-colors font-medium">
          Sign In
        </Link>
      </div>
    </GlassCard>
  );
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden bg-transparent">
      {/* Global Background Handles the Space Environment */}
      <main className="relative z-10 w-full max-w-[800px] animate-in fade-in zoom-in duration-700">
        <React.Suspense fallback={<div className="w-full flex items-center justify-center p-12 text-white">Loading...</div>}>
          <RegisterForm />
        </React.Suspense>
      </main>
    </div>
  );
}
