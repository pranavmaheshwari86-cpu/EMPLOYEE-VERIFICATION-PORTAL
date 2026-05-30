"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, MessageSquare, Send, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassInput } from "@/components/ui/glass-input";
import { GlassButton } from "@/components/ui/glass-button";
import { TextReveal } from "@/components/effects/text-reveal";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset success state after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-aetheris-black flex flex-col">
      <Navbar />

      <main className="flex-1 relative pt-32 pb-20">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,_rgba(139,92,246,0.15),_transparent_50%)] pointer-events-none" />

        <div className="container-aetheris relative z-10 px-4">
          
          <div className="max-w-5xl mx-auto">
            <div className="mb-16 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-sm mb-6 border-aetheris-cyan/30 text-aetheris-cyan text-sm font-medium tracking-wide"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get in Touch</span>
              </motion.div>
              
              <TextReveal as="h1" className="text-4xl md:text-5xl font-display font-bold mb-6">
                Let's build the future together.
              </TextReveal>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-aetheris-muted max-w-2xl"
              >
                Whether you're looking to hire verified talent, verify your own credentials, or partner with us, our team is ready to help.
              </motion.p>
            </div>

            <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
              
              {/* Contact Info (Left Column) */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="md:col-span-2 space-y-6"
              >
                <GlassCard className="p-6 border-white/5">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full glass-sm flex items-center justify-center shrink-0 text-aetheris-cyan">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-aetheris-white mb-1">Email Us</h4>
                        <a href="mailto:hello@aetheris.ai" className="text-aetheris-muted hover:text-aetheris-cyan transition-colors">hello@aetheris.ai</a>
                        <br />
                        <a href="mailto:support@aetheris.ai" className="text-aetheris-muted hover:text-aetheris-cyan transition-colors">support@aetheris.ai</a>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full glass-sm flex items-center justify-center shrink-0 text-aetheris-violet">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-aetheris-white mb-1">Global HQ</h4>
                        <p className="text-aetheris-muted">
                          100 Innovation Drive<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="w-full h-px bg-white/5" />

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full glass-sm flex items-center justify-center shrink-0 text-aetheris-emerald">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-aetheris-white mb-1">Call Us</h4>
                        <a href="tel:+18005550199" className="text-aetheris-muted hover:text-aetheris-emerald transition-colors">+1 (800) 555-0199</a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
                
                {/* Embedded Map Placeholder */}
                <div className="w-full h-48 rounded-2xl glass-sm overflow-hidden relative border border-white/5">
                  <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco,CA&zoom=13&size=600x300&maptype=roadmap&style=feature:all|element:labels.text.fill|color:0x8b95a5&style=feature:all|element:labels.text.stroke|visibility:off&style=feature:landscape|element:geometry|color:0x030712&style=feature:poi|element:geometry|color:0x111827&style=feature:road|element:geometry|color:0x1f2937&style=feature:water|element:geometry|color:0x000000&sensor=false')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-12 h-12 rounded-full bg-aetheris-cyan/20 flex items-center justify-center backdrop-blur-md border border-aetheris-cyan/50 animate-pulse">
                        <MapPin className="w-6 h-6 text-aetheris-cyan" />
                     </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form (Right Column) */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="md:col-span-3"
              >
                <GlassCard className="p-6 md:p-8">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center h-full py-12"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/50">
                        <CheckCircle className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-aetheris-white mb-2">Message Sent</h3>
                      <p className="text-aetheris-muted max-w-md">
                        Thank you for reaching out. A member of our team will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <GlassInput label="First Name" placeholder="John" required />
                        <GlassInput label="Last Name" placeholder="Doe" required />
                      </div>

                      <GlassInput label="Work Email" type="email" placeholder="john@company.com" required />

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-aetheris-muted ml-1">Subject</label>
                        <select className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 text-aetheris-white px-4 focus:outline-none focus:border-aetheris-cyan/50 focus:ring-1 focus:ring-aetheris-cyan/50 transition-all appearance-none cursor-pointer">
                          <option value="sales" className="bg-aetheris-black text-aetheris-white">Enterprise Sales Inquiry</option>
                          <option value="support" className="bg-aetheris-black text-aetheris-white">Technical Support</option>
                          <option value="talent" className="bg-aetheris-black text-aetheris-white">Candidate Help</option>
                          <option value="other" className="bg-aetheris-black text-aetheris-white">Other</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-aetheris-muted ml-1">Message</label>
                        <textarea 
                          className="w-full min-h-[150px] rounded-xl bg-white/[0.03] border border-white/10 text-aetheris-white p-4 focus:outline-none focus:border-aetheris-cyan/50 focus:ring-1 focus:ring-aetheris-cyan/50 transition-all resize-y placeholder:text-aetheris-muted/50"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      <GlassButton 
                        type="submit" 
                        variant="primary" 
                        className="w-full"
                        disabled={isSubmitting}
                        icon={isSubmitting ? undefined : <Send className="w-4 h-4" />}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </GlassButton>
                    </form>
                  )}
                </GlassCard>
              </motion.div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
