"use client";

import { useEffect, useRef } from "react";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Search, Cpu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const FadingVideo = dynamic(() => import("@/components/FadingVideo"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#131313] animate-pulse" />
});
export function LandingPage() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <SmoothScrollProvider>
      <style dangerouslySetInnerHTML={{__html: `
        .landing-liquid-glass {
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .landing-liquid-glass-elevated {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .landing-liquid-glass-input {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .landing-video-container {
            position: relative;
            overflow: hidden;
            border-radius: 3rem;
            transform: translateZ(0);
        }
        .landing-video-container video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transform: scale(1.01);
        }
      `}} />

      <main className="bg-[#131313] text-[#e2e2e2] font-body antialiased selection:bg-white/20 selection:text-white">
        
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-[#131313]/40 text-white font-body backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 md:px-10 py-4 z-50 transition-all duration-300">
          <div className="font-heading text-4xl tracking-tighter text-white">Aetheris</div>
          <div className="hidden md:flex items-center gap-10">
            <a className="text-white border-b border-white pb-1 transition-colors duration-300" href="#experience">How it Works</a>
            <a className="text-[#c4c7c8] hover:text-white hover:backdrop-blur-2xl hover:bg-white/5 transition-all duration-300 rounded px-2 py-1" href="#visions">Employers</a>
            <a className="text-[#c4c7c8] hover:text-white hover:backdrop-blur-2xl hover:bg-white/5 transition-all duration-300 rounded px-2 py-1" href="#fleet">Candidates</a>
            <a className="text-[#c4c7c8] hover:text-white hover:backdrop-blur-2xl hover:bg-white/5 transition-all duration-300 rounded px-2 py-1" href="#journal">Features</a>
          </div>
          <Link href="/auth/login" className="landing-liquid-glass px-6 py-2 rounded-full font-body text-sm uppercase tracking-wider hover:bg-white/10 transition-colors">Portal</Link>
        </nav>

        {/* Section 1: Hero */}
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden pt-20 pb-20 px-6" id="home">
          <div className="absolute inset-0 z-0 opacity-60">
            <FadingVideo 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/40 via-transparent to-[#131313]"></div>
          </div>
          
          <motion.div 
            style={{ opacity: heroOpacity, scale: heroScale }}
            className="relative z-10 flex flex-col items-center max-w-[1440px] w-full mx-auto mt-24"
          >
            <motion.h1 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[100px] md:text-[140px] leading-[0.9] tracking-tighter text-center mb-12 mix-blend-screen text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            >
              Verify with <i className="font-heading italic opacity-80">certainty</i>
            </motion.h1>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8"
            >
              <Link href="/auth/candidate" className="landing-liquid-glass px-8 py-4 rounded-full font-body text-white hover:bg-white/10 transition-colors uppercase tracking-widest text-sm flex items-center gap-3">
                Candidate <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/auth/company" className="landing-liquid-glass px-8 py-4 rounded-full font-body text-white hover:bg-white/10 transition-colors uppercase tracking-widest text-sm flex items-center gap-3">
                Company <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Section 2: About */}
        <section className="relative w-full py-32 px-6" id="experience">
          <div className="absolute top-0 inset-x-0 h-64 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none"></div>
          <div className="max-w-[1440px] mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="font-heading text-4xl md:text-5xl italic text-white/60 max-w-4xl mx-auto leading-tight"
            >
              "The definitive standard for verifying employment history, instantly and securely."
            </motion.h2>
          </div>
        </section>

        {/* Section 3: Featured Video */}
        <section className="relative w-full py-16 px-6" id="visions">
          <div className="max-w-[1440px] mx-auto relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="landing-video-container aspect-video w-full overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] relative"
            >
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4" type="video/mp4"/>
              </video>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
                <div className="landing-liquid-glass-elevated rounded-2xl px-6 py-4 backdrop-blur-3xl">
                  <span className="font-body text-sm text-white/80 uppercase tracking-widest block mb-1">For Employers</span>
                  <h3 className="font-heading text-3xl text-white m-0">Hire with Confidence</h3>
                </div>
                <button onClick={() => router.push('/auth/register')} className="landing-liquid-glass rounded-full px-8 py-4 flex items-center gap-3 hover:bg-white/10 transition-colors duration-300 border border-white/10 hover:border-white/30 group/btn cursor-pointer">
                  <span className="font-body text-sm uppercase tracking-wider text-white">Verify Candidates</span>
                  <ArrowRight className="w-5 h-5 text-white group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 4: Philosophy */}
        <section className="relative w-full py-32 px-6" id="fleet">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="order-2 md:order-1 landing-video-container aspect-square overflow-hidden border border-white/5 relative"
            >
              <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80 mix-blend-lighten">
                <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4"/>
              </video>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#131313]/80 to-transparent"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="order-1 md:order-2 flex flex-col space-y-12"
            >
              <h2 className="font-heading text-[60px] md:text-[80px] leading-none tracking-tight text-white">
                Data Privacy <span className="italic text-white/40">x</span> Security
              </h2>
              <div className="space-y-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span className="font-body text-sm text-white/50 uppercase tracking-widest">Complete Control</span>
                  </div>
                  <p className="font-body text-lg text-[#c4c7c8] max-w-md ml-12">Employees maintain full control over their employment records, ensuring data privacy while providing cryptographic proof to future employers.</p>
                </div>
                <div className="h-[1px] w-full bg-white/5"></div>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-[1px] bg-white/20"></span>
                    <span className="font-body text-sm text-white/50 uppercase tracking-widest">Instant Processing</span>
                  </div>
                  <p className="font-body text-lg text-[#c4c7c8] max-w-md ml-12">Say goodbye to weeks of waiting for background checks. Our automated ledger verifies your past experience in milliseconds.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 5: Services */}
        <section className="relative w-full py-32 px-6 bg-[#0e0e0e]" id="journal">
          <div className="max-w-[1440px] mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading text-[48px] mb-12 text-center text-white tracking-tight"
            >
              Verification Ecosystem
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="landing-liquid-glass rounded-[3rem] p-6 group cursor-pointer relative overflow-hidden flex flex-col h-[500px]"
              >
                <div className="absolute inset-0 z-0">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-screen grayscale">
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" type="video/mp4"/>
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md self-end">
                    <Search className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <span className="font-body text-sm text-white/50 uppercase tracking-widest block mb-2">For Organizations</span>
                    <h3 className="font-heading text-3xl text-white mb-2">Automated Reference Checks</h3>
                    <p className="font-body text-[#c4c7c8] max-w-sm">Eliminate manual HR overhead. Instantly verify past titles, tenures, and performance records through our secure network.</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="landing-liquid-glass rounded-[3rem] p-6 group cursor-pointer relative overflow-hidden flex flex-col h-[500px]"
              >
                <div className="absolute inset-0 z-0">
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 mix-blend-screen grayscale">
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4" type="video/mp4"/>
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md self-end">
                    <Cpu className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <span className="font-body text-sm text-white/50 uppercase tracking-widest block mb-2">For Candidates</span>
                    <h3 className="font-heading text-3xl text-white mb-2">Portable Work History</h3>
                    <p className="font-body text-[#c4c7c8] max-w-sm">Carry a cryptographically secure, immutable record of your professional journey that you can share with a single click.</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Footer Shared Component */}
        <footer className="w-full bg-transparent text-[#c6c6ce] font-body text-sm border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-6 py-10 max-w-[1440px] mx-auto opacity-80 hover:opacity-100 transition-opacity">
          <div className="font-heading text-5xl md:text-[72px] text-white mb-4 md:mb-0">Aetheris</div>
          <div className="mb-4 md:mb-0 text-[#c4c7c8]">© 2026 Aetheris Verification System. All rights reserved.</div>
          <div className="flex gap-6">
            <a className="text-[#ba1340] hover:text-white transition-colors" href="/privacy">Privacy</a>
            <a className="text-[#ba1340] hover:text-white transition-colors" href="/terms">Terms</a>
            <a className="text-[#ba1340] hover:text-white transition-colors" href="/safety">Safety</a>
          </div>
        </footer>
      </main>
    </SmoothScrollProvider>
  );
}
