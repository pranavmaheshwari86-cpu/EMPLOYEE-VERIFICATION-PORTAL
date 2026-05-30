import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useMyApplications } from '../../hooks/useApplications';
import { Clock, CheckCircle, XCircle, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Applications() {
  const { data: applications, isLoading } = useMyApplications();

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'reviewed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'shortlisted': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 mr-1.5" />;
      case 'shortlisted': return <CheckCircle className="w-4 h-4 mr-1.5" />;
      case 'rejected': return <XCircle className="w-4 h-4 mr-1.5" />;
      default: return <Clock className="w-4 h-4 mr-1.5" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">My Applications</h1>
          <p className="text-slate-400 mt-2">Track and manage your job applications.</p>
        </div>

        <div className="bg-[#131722] border border-white/5 rounded-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-slate-400">Loading applications...</div>
          ) : !applications || applications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#1a1f2e] rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                <FileText className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No applications yet</h3>
              <p className="text-slate-400 max-w-md mx-auto mb-6">You haven't applied to any jobs yet. Start browsing opportunities to submit your first application.</p>
              <Link to="/jobs" className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition-colors">
                Find Jobs
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#1a1f2e] text-slate-300">
                  <tr>
                    <th className="px-6 py-4 font-medium">Job Title</th>
                    <th className="px-6 py-4 font-medium">Company</th>
                    <th className="px-6 py-4 font-medium">Applied Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">ATS Match</th>
                    <th className="px-6 py-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {applications.map((app) => (
                    <tr key={app._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{app.job?.title || 'Unknown Job'}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{app.job?.location || 'Remote'}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">{app.job?.employer?.companyName || 'Company'}</td>
                      <td className="px-6 py-4 text-slate-300">{new Date(app.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status)}`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {app.aiAnalysis?.atsScore ? (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full" 
                                style={{ width: `${app.aiAnalysis.atsScore}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-300">{app.aiAnalysis.atsScore}%</span>
                          </div>
                        ) : (
                          <span className="text-slate-500 text-xs">Analyzing...</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/jobs/${app.job?._id}`} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors" title="View Job">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
