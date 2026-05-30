"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Stripe",
  "Shopify",
  "Salesforce",
  "Adobe",
  "Tesla",
  "SpaceX",
  "Palantir",
  "Datadog",
  "Snowflake",
  "Vercel",
];

function CompanyLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center px-8 py-4 mx-4 rounded-xl glass-sm hover:glass transition-all duration-300 group min-w-[160px]">
      <span className="text-sm font-display font-semibold text-aetheris-subtle group-hover:text-aetheris-muted transition-colors duration-300 tracking-wide whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function CompaniesSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Top and bottom fade edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="container-aetheris mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-aetheris-subtle text-sm uppercase tracking-widest font-medium mb-2">
            Trusted by innovators worldwide
          </p>
          <h2 className="text-headline font-display">
            Powering hiring at{" "}
            <span className="gradient-text-primary">world-class</span> companies
          </h2>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-aetheris-black to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-aetheris-black to-transparent z-10" />

        <div className="flex animate-marquee">
          {[...companies, ...companies].map((company, i) => (
            <CompanyLogo key={`row1-${i}`} name={company} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse direction) */}
      <div className="relative mt-4">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-aetheris-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-aetheris-black to-transparent z-10" />

        <div
          className="flex"
          style={{
            animation: "marquee 30s linear infinite reverse",
          }}
        >
          {[...companies.slice().reverse(), ...companies.slice().reverse()].map(
            (company, i) => (
              <CompanyLogo key={`row2-${i}`} name={company} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
