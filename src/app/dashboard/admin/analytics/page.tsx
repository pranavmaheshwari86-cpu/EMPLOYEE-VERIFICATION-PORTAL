import React from 'react';

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass p-5 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Total Users</h3>
          <p className="text-3xl font-semibold text-white">12,450</p>
          <p className="text-xs text-green-400 mt-2">+12% from last month</p>
        </div>
        <div className="glass p-5 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Active Verifications</h3>
          <p className="text-3xl font-semibold text-white">3,204</p>
          <p className="text-xs text-green-400 mt-2">+5% from last month</p>
        </div>
        <div className="glass p-5 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-semibold text-white">$45,200</p>
          <p className="text-xs text-green-400 mt-2">+18% from last month</p>
        </div>
        <div className="glass p-5 rounded-xl border border-white/10">
          <h3 className="text-sm text-gray-400 mb-1">AI Match Rate</h3>
          <p className="text-3xl font-semibold text-white">92%</p>
          <p className="text-xs text-green-400 mt-2">+2% from last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="glass p-6 rounded-xl border border-white/10 h-64 flex items-center justify-center">
          <p className="text-gray-500">Revenue Chart Placeholder</p>
        </div>
        <div className="glass p-6 rounded-xl border border-white/10 h-64 flex items-center justify-center">
          <p className="text-gray-500">User Growth Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
}
