import { motion } from 'framer-motion';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FraudRiskMeter({ riskScore, riskLevel, flags = [] }) {
  const isHighRisk = riskLevel === 'high' || riskLevel === 'critical';
  const color = isHighRisk ? 'text-rose-500' : (riskLevel === 'medium' ? 'text-amber-500' : 'text-emerald-500');
  const bgGlow = isHighRisk ? 'bg-rose-500/20' : (riskLevel === 'medium' ? 'bg-amber-500/20' : 'bg-emerald-500/20');

  return (
    <div className={cn("rounded-2xl border p-6 relative overflow-hidden", isHighRisk ? 'border-rose-500/30 bg-rose-950/10' : 'border-slate-800 bg-slate-900/50')}>
      <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full blur-3xl", bgGlow)} />
      
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {isHighRisk ? <ShieldAlert className={cn("h-6 w-6", color)} /> : <ShieldCheck className={cn("h-6 w-6", color)} />}
          <h3 className="text-lg font-semibold text-white">Fraud Analysis</h3>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border", 
          isHighRisk ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 
          (riskLevel === 'medium' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400')
        )}>
          {riskLevel} RISK
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Risk Score</span>
          <span className="text-white font-mono">{riskScore}/100</span>
        </div>
        <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${riskScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={cn("h-full", isHighRisk ? 'bg-rose-500' : (riskLevel === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'))}
          />
        </div>
      </div>

      {flags.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-slate-300">Detected Flags:</h4>
          <ul className="space-y-2">
            {flags.map((flag, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2 bg-black/20 p-2 rounded-lg border border-white/5">
                <span className="text-rose-400 mt-0.5">•</span>
                <span className="text-slate-300">{flag.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {flags.length === 0 && (
        <p className="text-sm text-emerald-400 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
          No suspicious patterns detected in application history.
        </p>
      )}
    </div>
  );
}
