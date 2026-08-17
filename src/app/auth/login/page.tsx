"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, ArrowLeft, User, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { useAppStore } from "@/lib/store";
import toast from "react-hot-toast";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const isLoading = useAppStore((state) => state.isLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  React.useEffect(() => {
    router.prefetch("/auth/onboarding");
    router.prefetch("/dashboard/employee");
    router.prefetch("/dashboard/recruiter");
    router.prefetch("/auth/register");
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      await login(email, password);
      toast.success("Login successful!");
      const state = useAppStore.getState();
      const role = state.user?.role || "EMPLOYEE";
      if (!state.hasProfile) {
        router.push("/auth/onboarding");
      } else {
        router.push(`/dashboard/${role.toLowerCase()}`);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to login");
    }
  };

  const handleSocialLogin = async (provider: string) => {
    toast.loading(`Connecting to ${provider}...`, { id: "auth" });
    try {
      // DEV BYPASS for OAuth - Instant response
      if (process.env.NODE_ENV === 'development') {
        try {
          await login("dev@example.com", "Password123!", "EMPLOYEE");
          toast.success(`Mock ${provider} login successful!`, { id: "auth" });
          router.push("/dashboard/employee");
        } catch (err: any) {
          toast.error(err.message || "Failed to login", { id: "auth" });
        }
        return;
      }

      const supabase = createClient();
      if (provider.toLowerCase() === 'google') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/api/auth/callback`
          }
        });
        if (error) throw error;
      } else {
        toast.error(`${provider} login not implemented yet.`, { id: "auth" });
      }
    } catch (error: any) {
      toast.error(error.message || `Failed to connect to ${provider}`, { id: "auth" });
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

          <h1 className="font-heading italic text-4xl text-white mb-4 text-center">Sign In Portal</h1>
          <p className="font-body text-[#c4c7c8] text-center mb-8 max-w-sm">Access your cryptographically secure employment history and professional profile.</p>

          <form className="w-full flex flex-col gap-4 text-left" onSubmit={handleLogin}>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                  <User className="w-[18px] h-[18px]" />
                </div>
                <input 
                  type="email" 
                  placeholder="you@example.com"
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
                  placeholder="Enter your password" 
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
            
            <div className="flex items-center justify-between w-full px-2 mt-1 mb-2">
              <label 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div className={`w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors ${rememberMe ? 'bg-[#3b82f6] border-[#3b82f6]' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}>
                  {rememberMe && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-[11px] text-[#c4c7c8] group-hover:text-white transition-colors">Remember me</span>
              </label>
              <button 
                type="button" 
                onClick={() => toast("Password reset link sent!")}
                className="text-[11px] text-[#c4c7c8] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <GlassButton 
              type="submit"
              disabled={isLoading}
              variant="primary"
              className="w-full py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-2"
            >
              {isLoading ? "SIGNING IN..." : (
                <>SIGN IN TO PORTAL <ArrowUpRight className="w-4 h-4 ml-2" /></>
              )}
            </GlassButton>
            
            <div className="flex items-center gap-4 w-full my-4">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10"></div>
              <span className="text-xs text-aetheris-muted font-medium">Or continue with</span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <div className="flex gap-4 w-full">
              <button 
                type="button" 
                onClick={() => handleSocialLogin("Google")}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-transparent border border-white/10 rounded-xl text-gray-300 text-lg font-medium hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
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
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-transparent border border-white/10 rounded-xl text-gray-300 text-lg font-medium hover:bg-white/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="#0077b5" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </button>
            </div>
            
            <GlassButton 
              type="button"
              onClick={() => router.push('/auth/register?role=EMPLOYEE')}
              variant="secondary"
              className="w-full py-4 rounded-full border border-white/20 bg-transparent hover:bg-white/5 mt-1"
            >
              CREATE NEW PROFILE <ArrowUpRight className="w-4 h-4 ml-2" />
            </GlassButton>
          </form>

        </GlassCard>
      </main>
    </div>
  );
}
