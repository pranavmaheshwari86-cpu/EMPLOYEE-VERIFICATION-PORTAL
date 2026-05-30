"use client";

import React, { useState } from "react";
import { Plus, Clock, X, Check, Eye, CheckCircle } from "lucide-react";

export default function LeaveRequestsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative">
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading italic font-medium text-[var(--color-on-surface)] mb-2">Leave Requests</h1>
            <p className="text-[var(--color-on-surface-variant)]">Manage and track your absence verifications.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-5 py-2.5 rounded-full bg-[var(--color-primary-fixed-dim)] text-[var(--color-on-primary)] text-sm font-medium hover:bg-[var(--color-primary)] transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Request
          </button>
        </div>

        {/* Leave Balances */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="liquid-glass p-5">
            <div className="text-sm text-[var(--color-on-surface-variant)] mb-1">Annual Leave</div>
            <div className="text-2xl font-heading italic text-[var(--color-on-surface)]"><span className="text-[var(--color-primary-fixed-dim)]">14</span> / 20 days</div>
          </div>
          <div className="liquid-glass p-5">
            <div className="text-sm text-[var(--color-on-surface-variant)] mb-1">Sick Leave</div>
            <div className="text-2xl font-heading italic text-[var(--color-on-surface)]"><span className="text-[var(--color-error)]">2</span> / 10 days</div>
          </div>
          <div className="liquid-glass p-5">
            <div className="text-sm text-[var(--color-on-surface-variant)] mb-1">Remote Work</div>
            <div className="text-2xl font-heading italic text-[var(--color-on-surface)]">Unlimited</div>
          </div>
          <div className="liquid-glass p-5">
            <div className="text-sm text-[var(--color-on-surface-variant)] mb-1">Comp Time</div>
            <div className="text-2xl font-heading italic text-[var(--color-on-surface)]">16 hrs</div>
          </div>
        </div>

        {/* History Table */}
        <div className="liquid-glass-strong rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-[var(--color-glass-border)]/10 flex justify-between items-center bg-[var(--color-surface-variant)]/10">
            <h2 className="text-lg font-medium text-[var(--color-on-surface)]">Request History</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)]/30 text-xs text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors">All</button>
              <button className="px-3 py-1.5 rounded-lg bg-[var(--color-primary-fixed-dim)]/20 text-xs text-[var(--color-primary-fixed-dim)] border border-[var(--color-primary-fixed-dim)]/30">Pending</button>
              <button className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-variant)]/30 text-xs text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)] transition-colors">Approved</button>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[var(--color-surface-variant)]/20 text-[var(--color-on-surface-variant)] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Duration</th>
                  <th className="px-6 py-4 font-medium">Dates</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-glass-border)]/10">
                <tr className="hover:bg-[var(--color-surface-variant)]/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--color-on-surface)]">Annual Leave</div>
                    <div className="text-xs text-[var(--color-on-surface-variant)]">Summer Vacation</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)]">5 days</td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)]">Aug 12 - Aug 16, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/20 flex items-center gap-1 w-max">
                      <Clock className="w-3 h-3" /> Pending Manager Approval
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-error)] transition-colors"><X className="w-4 h-4" /></button>
                  </td>
                </tr>
                <tr className="hover:bg-[var(--color-surface-variant)]/10 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--color-on-surface)]">Sick Leave</div>
                    <div className="text-xs text-[var(--color-on-surface-variant)]">Medical Appointment</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)]">0.5 days</td>
                  <td className="px-6 py-4 text-[var(--color-on-surface-variant)]">May 02, 2026</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20 flex items-center gap-1 w-max">
                      <Check className="w-3 h-3" /> Approved
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary-fixed-dim)] transition-colors"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-aetheris-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
          
          <div className="liquid-glass-strong w-full max-w-md relative z-10 animate-scale-in p-8 text-center border border-[var(--color-primary-fixed-dim)]/20 shadow-[0_0_50px_rgba(0,219,233,0.15)]">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[var(--color-on-surface-variant)] hover:text-[var(--color-on-surface)]">
              <X className="w-5 h-5" />
            </button>
            
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary-fixed-dim)]/10 flex items-center justify-center border border-[var(--color-primary-fixed-dim)]/30">
              <CheckCircle className="w-8 h-8 text-[var(--color-primary-fixed-dim)]" />
            </div>
            
            <h3 className="text-2xl font-heading italic font-medium text-[var(--color-on-surface)] mb-2">Request Submitted</h3>
            <p className="text-[var(--color-on-surface-variant)] text-sm mb-8">Your leave request for 5 days has been routed to Sarah Jenkins for approval.</p>
            
            <button onClick={() => setShowModal(false)} className="w-full py-3 rounded-xl bg-[var(--color-surface-variant)]/50 hover:bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] font-medium transition-colors border border-[var(--color-glass-border)]/20">
              View Status Tracker
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
