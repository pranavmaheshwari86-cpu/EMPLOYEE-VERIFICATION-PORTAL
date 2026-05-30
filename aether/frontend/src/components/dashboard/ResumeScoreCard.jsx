import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function ResumeScoreCard({ score, skillsMatch, experienceMatch }) {
  const getScoreColor = (value) => {
    if (value >= 80) return 'text-emerald-400 stroke-emerald-400';
    if (value >= 60) return 'text-amber-400 stroke-amber-400';
    return 'text-rose-400 stroke-rose-400';
  };

  const getScoreBg = (value) => {
    if (value >= 80) return 'from-emerald-500/20 to-emerald-900/10 border-emerald-500/20';
    if (value >= 60) return 'from-amber-500/20 to-amber-900/10 border-amber-500/20';
    return 'from-rose-500/20 to-rose-900/10 border-rose-500/20';
  };

  return (
    <div className={cn(
      "rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-xl",
      getScoreBg(score)
    )}>
      <h3 className="text-lg font-semibold text-white mb-6">ATS Resume Score</h3>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative h-32 w-32">
          {/* Background Circle */}
          <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-slate-800"
            />
            {/* Progress Circle */}
            <motion.circle
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              className={cn("drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]", getScoreColor(score))}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn("text-3xl font-bold", getScoreColor(score).split(' ')[0])}>
              {score}
            </span>
            <span className="text-xs text-slate-400 uppercase tracking-wider">Score</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Skills Match</span>
            <span className="text-white font-medium">{skillsMatch}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skillsMatch}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-blue-500"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">Experience Match</span>
            <span className="text-white font-medium">{experienceMatch}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${experienceMatch}%` }}
              transition={{ duration: 1, delay: 0.7 }}
              className="h-full bg-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
