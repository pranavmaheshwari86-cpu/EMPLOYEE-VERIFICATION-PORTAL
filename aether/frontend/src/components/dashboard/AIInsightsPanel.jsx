import { Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function AIInsightsPanel({ insights }) {
  const getIcon = (type) => {
    switch (type) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-400" />;
      default:
        return <Lightbulb className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-slate-900/50 p-6 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative AI Glow */}
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-indigo-500/10 blur-3xl" />
      
      <div className="flex items-center gap-3 mb-6 relative">
        <div className="rounded-lg bg-indigo-500/20 p-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">AETHER Insights</h3>
      </div>

      <div className="space-y-4 relative">
        {insights?.map((insight, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 rounded-xl bg-white/5 p-4 border border-white/5"
          >
            <div className="mt-0.5 rounded-full bg-slate-800 p-1.5">
              {getIcon(insight.type)}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200">{insight.title}</p>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                {insight.description}
              </p>
            </div>
          </div>
        ))}

        {(!insights || insights.length === 0) && (
          <p className="text-sm text-slate-500 text-center py-4">
            AETHER AI is currently analyzing your data...
          </p>
        )}
      </div>
    </div>
  );
}
