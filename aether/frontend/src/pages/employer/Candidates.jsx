import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Search, Filter, Users } from 'lucide-react';

export default function Candidates() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Candidates</h1>
            <p className="text-slate-400 mt-2">Review and manage applicants across all your jobs.</p>
          </div>
        </div>

        <div className="bg-[#131722] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search candidates by name, skills..." 
                className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-[#1a1f2e] hover:bg-white/5 text-slate-300 rounded-lg font-medium transition-colors border border-white/10 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
            </div>
          </div>
          
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="w-16 h-16 bg-[#1a1f2e] rounded-2xl flex items-center justify-center mb-4 border border-white/5">
              <Users className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No candidates found</h3>
            <p className="text-slate-400 mb-6 max-w-sm">
              You don't have any applicants yet. Once candidates apply to your jobs, they will appear here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
