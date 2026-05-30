import React from 'react';
import { DashboardLayout } from '../../layouts/DashboardLayout';
import { Plus, Search, MoreVertical, Briefcase } from 'lucide-react';

export default function ManageJobs() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Manage Jobs</h1>
            <p className="text-slate-400 mt-2">Create, edit, and monitor your job postings.</p>
          </div>
          <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Post New Job
          </button>
        </div>

        <div className="bg-[#131722] border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <div className="relative w-96">
              <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search jobs..." 
                className="w-full bg-[#1a1f2e] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-400">
              <span>Filter by:</span>
              <select className="bg-[#1a1f2e] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors">
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Drafts</option>
              </select>
            </div>
          </div>
          
          <div className="p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-16 h-16 bg-[#1a1f2e] rounded-2xl flex items-center justify-center mb-4 border border-white/5">
              <Briefcase className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No jobs posted yet</h3>
            <p className="text-slate-400 mb-6 max-w-sm">
              You haven't posted any jobs. Create your first job posting to start receiving applications.
            </p>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg font-medium transition-colors border border-white/10 flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Post Your First Job
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
