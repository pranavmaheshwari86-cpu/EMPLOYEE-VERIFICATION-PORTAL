"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, Filter, Shield, ShieldAlert, CheckCircle2, XCircle, MoreVertical, ShieldCheck, Activity } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

const USERS = [
  {
    id: "USR-001",
    name: "Alex Chen",
    email: "alex.chen@example.com",
    role: "employee",
    status: "active",
    trustScore: 98,
    lastActive: "2 mins ago",
    flags: 0
  },
  {
    id: "USR-002",
    name: "Anthropic HR",
    email: "recruiting@anthropic.com",
    role: "company",
    status: "active",
    trustScore: 100,
    lastActive: "1 hour ago",
    flags: 0
  },
  {
    id: "USR-003",
    name: "Marcus Johnson",
    email: "marcus.j@example.com",
    role: "employee",
    status: "flagged",
    trustScore: 45,
    lastActive: "2 days ago",
    flags: 2
  },
  {
    id: "USR-004",
    name: "System Admin",
    email: "admin@aetheris.network",
    role: "admin",
    status: "active",
    trustScore: 100,
    lastActive: "Just now",
    flags: 0
  }
];

export default function AdminUsersPage() {
  const [activeRole, setActiveRole] = useState("all");

  const filteredUsers = USERS.filter(u => activeRole === "all" || u.role === activeRole);

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "employee": return <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded bg-aetheris-cyan/10 text-aetheris-cyan border border-aetheris-cyan/20">Candidate</span>;
      case "company": return <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded bg-aetheris-violet/10 text-aetheris-violet border border-aetheris-violet/20">Company</span>;
      case "admin": return <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">Admin</span>;
      default: return null;
    }
  };

  const getStatusBadge = (status: string, flags: number) => {
    if (status === "flagged") {
      return <span className="flex items-center gap-1 text-xs font-medium text-rose-400"><ShieldAlert className="w-3.5 h-3.5"/> Flagged ({flags})</span>;
    }
    return <span className="flex items-center gap-1 text-xs font-medium text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5"/> Active</span>;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Network Users</h1>
          <p className="text-aetheris-muted text-sm">Manage access, monitor trust scores, and handle security flags.</p>
        </div>
        <GlassButton variant="primary" icon={<ShieldCheck className="w-4 h-4" />}>
          Run Security Audit
        </GlassButton>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Activity className="w-5 h-5 text-aetheris-cyan" /></div>
            <div>
               <div className="text-xl font-bold text-white">24,592</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Total Users</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><ShieldAlert className="w-5 h-5 text-rose-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">18</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Flagged Accounts</div>
            </div>
         </GlassCard>
         <GlassCard padding="sm" className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10"><Shield className="w-5 h-5 text-emerald-400" /></div>
            <div>
               <div className="text-xl font-bold text-white">99.8%</div>
               <div className="text-[10px] text-aetheris-muted uppercase tracking-wider">Network Trust</div>
            </div>
         </GlassCard>
      </div>

      <GlassCard padding="none" className="overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row justify-between gap-4 bg-white/[0.02]">
           <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
              {['all', 'employee', 'company', 'admin'].map(role => (
                <button 
                  key={role}
                  onClick={() => setActiveRole(role)}
                  aria-label={`Filter by ${role}`}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                    activeRole === role ? 'bg-white/10 text-white shadow' : 'text-aetheris-muted hover:text-white'
                  }`}
                >
                  {role}
                </button>
              ))}
           </div>
           
           <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 text-aetheris-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  aria-label="Search users"
                  placeholder="Search by ID, email, name..." 
                  className="pl-9 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-aetheris-cyan w-64"
                />
              </div>
              <button aria-label="Filter users" className="p-1.5 bg-white/5 rounded-lg border border-white/10 text-aetheris-muted hover:text-white transition-colors">
                <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-aetheris-muted bg-white/[0.01]">
                <th className="p-4 font-medium">User Details</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status & Flags</th>
                <th className="p-4 font-medium">Trust Score</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                         {user.name.split(' ').map(n=>n[0]).join('').substring(0, 2)}
                       </div>
                       <div>
                         <div className="font-medium text-white text-sm">{user.name}</div>
                         <div className="text-xs text-aetheris-muted">{user.email} • {user.id}</div>
                       </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(user.status, user.flags)}
                  </td>
                  <td className="p-4">
                     <span className={`text-sm font-bold ${
                        user.trustScore >= 90 ? 'text-emerald-400' :
                        user.trustScore >= 70 ? 'text-aetheris-cyan' : 'text-rose-400'
                     }`}>
                        {user.trustScore}/100
                     </span>
                  </td>
                  <td className="p-4">
                     <span className="text-xs text-aetheris-muted">{user.lastActive}</span>
                  </td>
                  <td className="p-4 text-right">
                    <button aria-label={`More actions for ${user.name}`} className="p-1 text-aetheris-muted hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
