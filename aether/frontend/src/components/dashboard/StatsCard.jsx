import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function StatsCard({ title, value, icon: Icon, trend, trendValue, color = 'blue' }) {
  const colorStyles = {
    blue: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/20',
    green: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/20',
    purple: 'from-purple-500/20 to-purple-600/5 text-purple-400 border-purple-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 text-amber-400 border-amber-500/20',
    rose: 'from-rose-500/20 to-rose-600/5 text-rose-400 border-rose-500/20',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        'relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 backdrop-blur-xl',
        colorStyles[color]
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={cn('rounded-xl bg-white/5 p-3 backdrop-blur-sm')}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span
            className={cn(
              'flex items-center text-xs font-medium',
              trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
            )}
          >
            {trend === 'up' ? '↑' : '↓'} {trendValue}%
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}

      {/* Decorative background glow */}
      <div
        className={cn(
          'absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-20',
          `bg-${color}-500`
        )}
      />
    </motion.div>
  );
}
