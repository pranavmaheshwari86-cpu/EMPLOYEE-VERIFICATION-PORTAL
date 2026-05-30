"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { Mail, Lock, User, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppStore, UserRole } from "@/lib/store";

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
          hrName: `${firstName} ${lastName}`
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
          Initialize Account
        </h1>
        <p className="text-lg text-aetheris-muted mt-2">Join the AI-native verification network.</p>
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
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        
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
            <GlassInput
              label="Company Name"
              icon={Briefcase}
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <div className="grid grid-cols-2 gap-4">
              <GlassInput
                label="Website URL"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              <GlassInput
                label="Industry Type"
                required
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
              />
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
            className="w-full" 
            icon={<ArrowRight className="w-4 h-4" />}
            loading={isLoading}
          >
            Complete Registration
          </GlassButton>
        </div>
      </form>

      <div className="mt-6 text-center text-sm text-aetheris-muted">
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
