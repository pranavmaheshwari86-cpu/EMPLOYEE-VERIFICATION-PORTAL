"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  MessageCircle,
  Users,
  Mail,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Platform: [
    { label: "For Candidates", href: "/auth/register" },
    { label: "For Recruiters", href: "/auth/register" },
    { label: "For Enterprise", href: "/" },
    { label: "Pricing", href: "/" },
    { label: "API Access", href: "/" },
  ],
  Solutions: [
    { label: "AI Verification", href: "/" },
    { label: "Talent Intelligence", href: "/" },
    { label: "Skill Assessment", href: "/" },
    { label: "Fraud Detection", href: "/" },
    { label: "Portfolio System", href: "/" },
  ],
  Resources: [
    { label: "Documentation", href: "/" },
    { label: "Blog", href: "/" },
    { label: "Case Studies", href: "/" },
    { label: "Changelog", href: "/" },
    { label: "Status", href: "/" },
  ],
  Company: [
    { label: "About", href: "/" },
    { label: "Careers", href: "/" },
    { label: "Press", href: "/" },
    { label: "Contact", href: "/" },
    { label: "Legal", href: "/" },
  ],
};

const socialLinks = [
  { icon: MessageCircle, href: "/", label: "Twitter" },
  { icon: Code, href: "/", label: "GitHub" },
  { icon: Users, href: "/", label: "LinkedIn" },
  { icon: Mail, href: "/", label: "Email" },
];

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-aetheris-void">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-aetheris-cyan/30 to-transparent" />

      <div className="container-aetheris section-padding">
        {/* Top section: Logo + Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md"
          >
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="relative flex items-center justify-center mr-1">
                <Image src="/logo.png" alt="Aetheris Logo" width={36} height={36} className="object-contain rounded-md" />
              </div>
              <span className="text-xl font-display font-bold tracking-tight">
                <span className="gradient-text-primary">AETHERIS</span>
              </span>
            </Link>
            <p className="text-aetheris-muted text-sm leading-relaxed mb-6">
              The world&apos;s first AI-native employee verification ecosystem.
              Building the future of trusted professional identity and
              intelligent hiring.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg glass-sm flex items-center justify-center text-aetheris-muted hover:text-aetheris-white hover:border-white/10 transition-all duration-300 hover:scale-105"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full lg:max-w-sm"
          >
            <h3 className="text-sm font-semibold text-aetheris-white mb-2">
              Stay ahead of hiring innovation
            </h3>
            <p className="text-aetheris-muted text-xs mb-4">
              Weekly insights on AI verification, talent intelligence, and the
              future of work.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 px-4 py-2.5 rounded-lg glass-sm text-sm text-aetheris-white placeholder:text-aetheris-subtle focus:outline-none focus:ring-1 focus:ring-aetheris-cyan/30 bg-transparent transition-all"
              />
              <button 
                type="submit"
                disabled={subscribed}
                className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-aetheris-cyan to-aetheris-blue text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Subscribed
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
            >
              <h4 className="text-xs font-semibold text-aetheris-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-aetheris-muted hover:text-aetheris-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-aetheris-subtle">
            &copy; {new Date().getFullYear()} AETHERIS Platform. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xs text-aetheris-subtle hover:text-aetheris-muted transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-xs text-aetheris-subtle hover:text-aetheris-muted transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-xs text-aetheris-subtle hover:text-aetheris-muted transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-aetheris-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-aetheris-emerald animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
