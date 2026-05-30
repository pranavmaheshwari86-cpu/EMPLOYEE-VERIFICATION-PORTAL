import React, { useMemo } from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { useAuthStore } from '../../store/authStore';
import { Users, Building2, ShieldAlert, DollarSign } from 'lucide-react';
import StatsCard from '../../components/dashboard/StatsCard';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import ActivityTimeline from '../../components/dashboard/ActivityTimeline';
import { useNotifications } from '../../hooks/useNotifications';

const chartData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1900 },
  { name: 'Wed', revenue: 1500 },
  { name: 'Thu', revenue: 2500 },
  { name: 'Fri', revenue: 2200 },
  { name: 'Sat', revenue: 3000 },
  { name: 'Sun', revenue: 2800 },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const { data: notifResponse } = useNotifications({ limit: 10 });

  // Format activities
  const activities = useMemo(() => {
    if (!notifResponse?.notifications) return [];
    return notifResponse.notifications.map(n => ({
      id: n._id,
      title: n.title,
      description: n.message,
      date: n.createdAt,
      type: n.type === 'fraud_alert' ? 'error' : (n.type === 'system' ? 'warning' : 'info')
    }));
  }, [notifResponse]);
  
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">System Overview</h1>
          <p className="text-slate-400 mt-2">Platform analytics, revenue, and security monitoring.</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard 
            title="Total Users" 
            value="1,248" 
            icon={Users} 
            color="blue" 
            trend="up" 
            trendValue="12" 
          />
          <StatsCard 
            title="Active Companies" 
            value="45" 
            icon={Building2} 
            color="purple" 
            trend="up" 
            trendValue="5" 
          />
          <StatsCard 
            title="Fraud Alerts" 
            value="12" 
            icon={ShieldAlert} 
            color="rose" 
            trend="down" 
            trendValue="8" 
          />
          <StatsCard 
            title="MRR" 
            value="$42.5k" 
            icon={DollarSign} 
            color="emerald" 
            trend="up" 
            trendValue="15" 
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AnalyticsChart 
              title="Revenue Trend" 
              data={chartData} 
              dataKey="revenue" 
              color="#06b6d4" 
            />
          </div>
          <div className="space-y-6">
            <ActivityTimeline activities={activities} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
