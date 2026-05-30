"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-xl bg-aetheris-cyan/20 animate-pulse" />
          <Loader2 className="w-10 h-10 text-aetheris-cyan animate-spin relative z-10" />
        </div>
        <p className="text-aetheris-muted font-body animate-pulse">Loading dashboard data...</p>
      </motion.div>
    </div>
  );
}
