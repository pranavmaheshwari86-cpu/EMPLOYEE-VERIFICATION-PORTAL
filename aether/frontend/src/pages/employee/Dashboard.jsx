import React, { useMemo } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import ResumeScoreCard from '../../components/dashboard/ResumeScoreCard';
import { useMyApplications } from '../../hooks/useApplications';
import { useNotifications } from '../../hooks/useNotifications';

export default function EmployeeDashboard() {
  const { user } = useAuthStore();
  const { data: applications, isLoading: appsLoading } = useMyApplications();
  const { data: notificationData, isLoading: notifLoading } = useNotifications({ limit: 5 });

  // Calculate stats
  const totalApps = applications?.length || 0;
  const pendingApps = applications?.filter(app => ['pending', 'reviewed'].includes(app.status)).length || 0;
  
  // Calculate average ATS score
  const avgAtsScore = useMemo(() => {
    if (!applications || applications.length === 0) return 0;
    const scores = applications
      .filter(app => app.aiAnalysis?.atsScore)
      .map(app => app.aiAnalysis.atsScore);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  }, [applications]);

  // Format activities from notifications
  const activities = useMemo(() => {
    if (!notificationData?.notifications) return [];
    return notificationData.notifications.map(n => ({
      id: n._id,
      title: n.title,
      description: n.message,
      date: n.createdAt,
      type: n.type === 'application_update' ? 'success' : (n.type === 'ai_analysis' ? 'info' : 'pending')
    }));
  }, [notificationData]);

  // Aggregate application data by month for chart
  const chartData = useMemo(() => {
    if (!applications) return [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = {};
    
    applications.forEach(app => {
      const date = new Date(app.createdAt);
      const month = months[date.getMonth()];
      counts[month] = (counts[month] || 0) + 1;
    });

    // Just show last 6 months
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 6 }).map((_, i) => {
      const idx = (currentMonth - 5 + i + 12) % 12;
      const month = months[idx];
      return { name: month, applications: counts[month] || 0 };
    });
  }, [applications]);

  // Get most recent analysis for scorecard
  const latestAnalysis = useMemo(() => {
    if (!applications) return null;
    const analyzedApps = applications.filter(app => app.aiAnalysis?.atsScore).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return analyzedApps[0]?.aiAnalysis || null;
  }, [applications]);

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-2">Welcome back, {user?.name}. Here's your career progress.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard 
            title="Total Applications" 
            value={appsLoading ? '...' : totalApps} 
            icon={FileText} 
            color="blue" 
          />
          <StatsCard 
            title="Avg ATS Score" 
            value={appsLoading ? '...' : `${avgAtsScore}%`} 
            icon={CheckCircle} 
            color="emerald" 
          />
          <StatsCard 
            title="Pending Actions" 
            value={appsLoading ? '...' : pendingApps} 
            icon={Clock} 
            color="amber" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart 
              title="Application Activity" 
              data={chartData} 
              dataKey="applications" 
              color="#3b82f6" 
            />
            <ActivityTimeline activities={activities} />
          </div>
          <div className="space-y-6">
            <ResumeScoreCard 
              score={latestAnalysis?.atsScore || 0} 
              skillsMatch={latestAnalysis?.skillsMatch?.score || 0} 
              experienceMatch={latestAnalysis?.experienceMatch?.score || 0} 
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
