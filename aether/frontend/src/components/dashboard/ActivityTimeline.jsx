import { format } from 'date-fns';
import { cn } from '../../utils/cn';
import { CheckCircle2, Clock, XCircle, FileText } from 'lucide-react';

export default function ActivityTimeline({ activities }) {
  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-rose-400" />;
      default:
        return <FileText className="h-5 w-5 text-blue-400" />;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
      <h3 className="mb-6 text-lg font-semibold text-white">Recent Activity</h3>
      
      <div className="relative border-l border-slate-800 ml-3 space-y-8">
        {activities.map((activity, index) => (
          <div key={activity.id || index} className="relative pl-6">
            <span className="absolute -left-[11px] top-1 rounded-full bg-slate-900 p-0.5">
              {getIcon(activity.type)}
            </span>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
              <p className="text-sm font-medium text-slate-200">{activity.title}</p>
              <span className="text-xs text-slate-500">
                {format(new Date(activity.date), 'MMM d, h:mm a')}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{activity.description}</p>
          </div>
        ))}

        {(!activities || activities.length === 0) && (
          <p className="pl-6 text-sm text-slate-500">No recent activity to show.</p>
        )}
      </div>
    </div>
  );
}
