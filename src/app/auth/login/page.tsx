"use client";

import React, { useState } from "react";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import toast from "react-hot-toast";
import { GlassCard } from "@/components/ui/glass-card";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const isLoading = useAppStore((state) => state.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      await login(email, password, "EMPLOYEE");
      toast.success("Login successful!");
      const user = useAppStore.getState().user;
      if (user?.role === "RECRUITER") {
        router.push("/dashboard/recruiter");
      } else if (user?.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/employee");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    }
  };

  return (
    <div 
      className="relative min-h-screen w-full flex overflow-hidden bg-[#050505]"
      style={{
        backgroundImage: `url('/bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-0"></div>

      {/* Left Section - Branding */}
      <div className="hidden lg:flex flex-col justify-center pl-24 w-1/2 h-full z-10 relative">
        <div className="flex flex-col items-center max-w-fit">
          <svg className="w-14 h-14 text-[#d6cdb5] mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2L2 22h20L12 2z" />
            <path d="M12 2v20" />
            <path d="M6 14h12" />
            <path d="M9 8h6" />
            <path d="M2 22L12 10L22 22" />
          </svg>
          
          <h1 className="text-2xl tracking-[0.5em] text-white font-medium mb-5 pl-2">AETHERIS</h1>
          <div className="w-6 h-[1px] bg-white/20 mb-5"></div>
          <p className="text-[9px] tracking-[0.2em] text-gray-400 font-medium uppercase text-center leading-relaxed">
            Intelligence Beyond<br />Boundaries
          </p>
        </div>
        
        <div className="absolute bottom-10 left-24 text-[10px] text-gray-500 font-medium">
          <p>© 2026 Aetheris Systems</p>
          <p className="mt-1">All rights reserved</p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 z-10">
        <main className="w-full max-w-[420px] animate-in fade-in zoom-in duration-700">
          <GlassCard padding="xl" className="w-full liquid-glass flex flex-col items-center bg-black/30 backdrop-blur-2xl border border-white/5 rounded-3xl">
            
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-[#d6cdb5]"></div>
              <span className="text-[8px] font-bold tracking-[0.15em] text-gray-300 uppercase mt-0.5">Secure Access</span>
            </div>

            <div className="w-full text-center mb-8">
              <h2 className="text-4xl text-white font-serif mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>Welcome back</h2>
              <p className="text-[13px] text-gray-400">Sign in to continue your journey</p>
            </div>

            <form className="w-full flex flex-col gap-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-gray-300 ml-1">Email address</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User className="w-[18px] h-[18px]" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111318]/50 border border-white/5 rounded-xl pl-12 pr-5 py-3.5 text-white text-[13px] focus:outline-none focus:border-white/20 transition-colors placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[11px] text-gray-300 ml-1">Password</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <Lock className="w-[18px] h-[18px]" />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#111318]/50 border border-white/5 rounded-xl pl-12 pr-12 py-3.5 text-white text-[13px] focus:outline-none focus:border-white/20 transition-colors placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full pt-1 pb-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="w-4 h-4 rounded-[4px] border border-white/10 bg-transparent flex items-center justify-center group-hover:border-white/30 transition-colors">
                  </div>
                  <span className="text-[11px] text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
                <button 
                  type="button" 
                  onClick={() => toast("Password reset link sent!")}
                  className="text-[11px] text-gray-400 hover:text-[#d6cdb5] underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#e8d5c4] to-[#c2b09a] text-black font-medium text-[13px] hover:opacity-90 transition-opacity disabled:opacity-50 mt-1 shadow-[0_0_20px_rgba(232,213,196,0.15)]"
              >
                {isLoading ? "Signing in..." : (
                  <>
                    Sign in <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </form>

            <div className="w-full flex items-center gap-3 my-7">
              <div className="flex-1 h-[1px] bg-white/5"></div>
              <span className="text-[9px] text-gray-500 font-bold tracking-[0.1em] uppercase">Or continue with</span>
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </div>

            <div className="w-full flex gap-3 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-transparent border border-white/10 rounded-xl text-gray-300 text-[13px] font-medium hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-transparent border border-white/10 rounded-xl text-gray-300 text-[13px] font-medium hover:bg-white/5 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="w-full text-center mb-8 flex items-center justify-center gap-1">
              <span className="text-[11px] text-gray-500">Don't have an account? </span>
              <button 
                onClick={() => router.push("/auth/register")}
                className="text-[11px] text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                Create account <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="w-full pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500 px-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Enterprise grade security</span>
              </div>
              <div className="w-[1px] h-3 bg-white/10 mx-2"></div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Your data, always protected</span>
              </div>
            </div>

          </GlassCard>
        </main>
      </div>
    </div>
  );
}
