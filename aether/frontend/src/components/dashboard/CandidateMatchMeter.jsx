import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function CandidateMatchMeter({ score, label = "Match Score" }) {
  const getColor = (value) => {
    if (value >= 85) return 'text-emerald-400 stroke-emerald-400';
    if (value >= 70) return 'text-blue-400 stroke-blue-400';
    if (value >= 50) return 'text-amber-400 stroke-amber-400';
    return 'text-rose-400 stroke-rose-400';
  };

  // Convert 0-100 score to SVG stroke dashoffset (circumference = 283)
  const offset = 283 - (283 * score) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative h-40 w-40">
        {/* Background Arc */}
        <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-800"
          />
          {/* Progress Arc */}
          <motion.circle
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray="283"
            className={cn("drop-shadow-[0_0_12px_rgba(0,0,0,0.5)]", getColor(score))}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-bold", getColor(score).split(' ')[0])}>
            {score}%
          </span>
          <span className="text-xs text-slate-400 uppercase tracking-widest mt-1 text-center">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
