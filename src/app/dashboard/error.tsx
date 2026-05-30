"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Dashboard Error:", error);
  }, [error]);

  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center max-w-md p-8 rounded-2xl bg-white/5 border border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.1)] backdrop-blur-xl"
      >
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 mb-6">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-heading text-white mb-3">Something went wrong!</h2>
        <p className="text-aetheris-muted mb-8 text-sm leading-relaxed">
          We encountered an error loading your dashboard data. Our systems have been notified. Please try again.
        </p>
        <GlassButton 
          variant="outline" 
          onClick={() => reset()}
          icon={<RefreshCcw className="w-4 h-4" />}
        >
          Try again
        </GlassButton>
      </motion.div>
    </div>
  );
}
