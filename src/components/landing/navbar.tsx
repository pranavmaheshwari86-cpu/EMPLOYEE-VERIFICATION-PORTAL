"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap, ChevronRight, Hexagon } from "lucide-react";
import { cn } from "@/lib/utils";
import { GlassButton } from "../ui/glass-button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/#features" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? "h-16" : "h-20"
        )}
      >
        {/* Scrolled background wrapper */}
        <div 
          className={cn(
            "absolute inset-0 transition-all duration-300",
            isScrolled 
              ? "backdrop-blur-xl bg-aetheris-black/50 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
              : "bg-transparent"
          )} 
        />

        <div className="container-aetheris h-full flex items-center justify-between relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Aetheris Logo" width={48} height={48} className="object-contain" />
            <span className="text-xl tracking-[0.4em] text-white font-medium pl-1">
              AETHERIS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-sm">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-sm font-medium text-aetheris-muted hover:text-aetheris-white hover:bg-white/[0.06] transition-colors relative"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-aetheris-muted hover:text-aetheris-white transition-colors">
              Login
            </Link>
            <Link href="/auth/register">
              <GlassButton variant="primary" size="sm" magnetic icon={<ChevronRight className="w-4 h-4" />}>
                Register
              </GlassButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-aetheris-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-aetheris-black/95 backdrop-blur-3xl flex flex-col"
          >
            <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
              <Link href="/" className="flex items-center gap-3" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="Aetheris Logo" width={48} height={48} className="object-contain" />
                <span className="text-xl tracking-[0.4em] text-white font-medium pl-1">
                  AETHERIS
                </span>
              </Link>
              <button
                className="p-2 text-aetheris-white bg-white/5 rounded-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-12 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-display font-semibold text-aetheris-white block border-b border-white/5 pb-4"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex flex-col gap-4"
              >
                <Link
                  href="/auth/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 text-center rounded-xl glass-sm text-aetheris-white font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 text-center rounded-xl bg-gradient-to-r from-aetheris-cyan to-aetheris-blue text-white font-medium"
                >
                  Register
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
