import React, { useMemo } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { Briefcase, Users, Star } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import AIInsightsPanel from '../../components/dashboard/AIInsightsPanel';
import { useEmployerJobs } from '../../hooks/useJobs';
import { useEmployerApplications } from '../../hooks/useApplications';
import { useNotifications } from '../../hooks/useNotifications';

export default function EmployerDashboard() {
  const { user } = useAuthStore();
  const { data: jobsResponse, isLoading: jobsLoading } = useEmployerJobs();
  const { data: appsResponse, isLoading: appsLoading } = useEmployerApplications();
  const { data: notifResponse } = useNotifications({ limit: 5 });

  const jobs = jobsResponse?.jobs || [];
  const applications = appsResponse?.applications || [];
  
  // Calculate stats
  const activeJobs = jobs.filter(j => j.status === 'open').length;
  const totalApplicants = applications.length;
  const shortlisted = applications.filter(a => a.status === 'shortlisted').length;

  // Aggregate application data by day for chart
  const chartData = useMemo(() => {
    if (!applications) return [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const counts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
    
    // Look at last 7 days only
    const now = new Date();
    applications.forEach(app => {
      const date = new Date(app.createdAt);
      if (now - date < 7 * 24 * 60 * 60 * 1000) {
        counts[days[date.getDay()]] += 1;
      }
    });

    // Reorder to start from 6 days ago to today
    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      result.push({ name: dayName, applicants: counts[dayName] });
    }
    return result;
  }, [applications]);

  // Format activities
  const activities = useMemo(() => {
    if (!notifResponse?.notifications) return [];
    return notifResponse.notifications.map(n => ({
      id: n._id,
      title: n.title,
      description: n.message,
      date: n.createdAt,
      type: n.type === 'system' ? 'error' : 'success'
    }));
  }, [notifResponse]);

  // Generate dynamic AI insights based on live data
  const aiInsights = useMemo(() => {
    const insights = [];
    if (applications.length > 0) {
      const avgAts = applications.reduce((acc, app) => acc + (app.aiAnalysis?.atsScore || 0), 0) / applications.length;
      if (avgAts > 75) {
        insights.push({ type: 'positive', title: 'High Quality Pool', description: `Average ATS score is strong at ${Math.round(avgAts)}%.` });
      } else if (avgAts > 0 && avgAts < 50) {
        insights.push({ type: 'warning', title: 'Low Quality Pool', description: 'Consider rewriting your job descriptions to attract better matches.' });
      }
    }
    
    const highFraud = applications.filter(a => a.aiAnalysis?.fraudRiskLevel === 'high' || a.aiAnalysis?.fraudRiskLevel === 'critical');
    if (highFraud.length > 0) {
      insights.push({ type: 'warning', title: 'Fraud Alerts Detected', description: `${highFraud.length} applicants show suspicious resume patterns.` });
    }

    if (activeJobs > 0 && applications.length === 0) {
      insights.push({ type: 'info', title: 'Need More Visibility?', description: 'Your active jobs have no applicants yet. Consider upgrading your plan to boost visibility.' });
    }

    if (insights.length === 0) {
      insights.push({ type: 'info', title: 'Monitoring Active', description: 'AETHER AI is actively monitoring incoming applications.' });
    }
    return insights;
  }, [applications, activeJobs]);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Employer Dashboard</h1>
          <p className="text-slate-400 mt-2">Manage your job postings and AI-driven applicant insights.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Active Jobs" 
            value={jobsLoading ? '...' : activeJobs} 
            icon={Briefcase} 
            color="purple" 
          />
          <StatsCard 
            title="Total Applicants" 
            value={appsLoading ? '...' : totalApplicants} 
            icon={Users} 
            color="blue" 
          />
          <StatsCard 
            title="Shortlisted" 
            value={appsLoading ? '...' : shortlisted} 
            icon={Star} 
            color="emerald" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart 
              title="Applicant Pipeline (Last 7 Days)" 
              data={chartData} 
              dataKey="applicants" 
              color="#8b5cf6" 
            />
            <ActivityTimeline activities={activities} />
          </div>
          <div className="space-y-6">
            <AIInsightsPanel insights={aiInsights} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
