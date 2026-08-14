"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowLeft, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import toast from "react-hot-toast";
import { useAppStore } from "@/lib/store";

export default function CompanyPortalPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password, "RECRUITER", firstName, lastName);
      toast.success("Login successful!");
      router.push("/dashboard/recruiter");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden bg-transparent">
      <main className="relative z-10 w-full max-w-[600px] animate-in fade-in zoom-in duration-700">
        <GlassCard padding="xl" className="w-full liquid-glass flex flex-col items-center text-center">
          
          <div className="flex items-center justify-center gap-4 mb-8 bg-white/5 border border-white/20 px-8 py-4 rounded-full">
            <img src="/logo.png" alt="Aetheris Logo" className="w-12 h-12 object-contain" />
            <span className="text-2xl tracking-[0.4em] text-white font-medium">AETHERIS</span>
          </div>

          <h1 className="font-heading italic text-4xl text-white mb-4 text-center">Company Portal</h1>
          <p className="font-body text-[#c4c7c8] text-center mb-10 max-w-sm">Securely verify candidate histories and issue immutable employment credentials.</p>

          <form className="w-full flex flex-col gap-4 text-left" onSubmit={handleLogin}>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                    <User className="w-[18px] h-[18px]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-full pl-12 pr-5 py-4 text-white text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                    <User className="w-[18px] h-[18px]" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-full pl-12 pr-5 py-4 text-white text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Mail className="w-[18px] h-[18px]" />
                </div>
                <input 
                  type="email" 
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-full pl-12 pr-5 py-4 text-white text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <Lock className="w-[18px] h-[18px]" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/20 border border-white/10 rounded-full pl-12 pr-12 py-4 text-white text-[15px] focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors z-10"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
            </div>

            <GlassButton 
              type="submit"
              variant="primary"
              className="w-full py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-4"
            >
              SIGN IN TO PORTAL <ArrowUpRight className="w-4 h-4 ml-2" />
            </GlassButton>
          </form>

          <div className="mt-6 w-full text-center">
            <GlassButton 
              type="button"
              variant="secondary"
              onClick={() => router.push('/auth/register?role=RECRUITER')}
              className="w-full py-4 rounded-full border border-white/20 bg-transparent hover:bg-white/5"
            >
              CREATE NEW ORGANIZATION <ArrowUpRight className="w-4 h-4 ml-2" />
            </GlassButton>
          </div>

        </GlassCard>
      </main>
    </div>
  );
}
