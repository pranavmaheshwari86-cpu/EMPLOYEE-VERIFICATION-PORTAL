"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, CreditCard, Building } from "lucide-react";
import { motion } from "framer-motion";

const TRANSACTIONS = [
  { id: "TXN-8901", company: "Anthropic", plan: "Enterprise", amount: 5000, date: "May 29, 2026", status: "completed" },
  { id: "TXN-8902", company: "Scale AI", plan: "Growth", amount: 799, date: "May 28, 2026", status: "completed" },
  { id: "TXN-8903", company: "Web3 Startup Inc", plan: "Startup", amount: 299, date: "May 28, 2026", status: "completed" },
  { id: "TXN-8904", company: "Suspect Corp", plan: "Growth", amount: 799, date: "May 27, 2026", status: "failed" },
  { id: "TXN-8905", company: "TechFlow Inc", plan: "Startup", amount: 299, date: "May 26, 2026", status: "completed" },
];

export default function AdminRevenuePage() {
  const [timeRange, setTimeRange] = useState("30d");

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Revenue Dashboard</h1>
          <p className="text-aetheris-muted text-sm">Monitor platform subscription metrics and financial performance.</p>
        </div>
        
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
          {["7d", "30d", "90d", "1y"].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeRange === range ? "bg-white/10 text-white shadow" : "text-aetheris-muted hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <GlassCard padding="lg" className="border-t-2 border-t-emerald-400">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <DollarSign className="w-5 h-5 text-emerald-400" />
               </div>
               <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                 <ArrowUpRight className="w-3 h-3" /> 12.5%
               </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">$142,500</div>
            <div className="text-xs text-aetheris-muted uppercase tracking-wider">Monthly Recurring Revenue</div>
         </GlassCard>

         <GlassCard padding="lg" className="border-t-2 border-t-aetheris-cyan">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <TrendingUp className="w-5 h-5 text-aetheris-cyan" />
               </div>
               <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                 <ArrowUpRight className="w-3 h-3" /> 8.2%
               </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">$1.7M</div>
            <div className="text-xs text-aetheris-muted uppercase tracking-wider">Annual Run Rate (ARR)</div>
         </GlassCard>

         <GlassCard padding="lg" className="border-t-2 border-t-aetheris-violet">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <Building className="w-5 h-5 text-aetheris-violet" />
               </div>
               <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                 <ArrowUpRight className="w-3 h-3" /> 24
               </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">342</div>
            <div className="text-xs text-aetheris-muted uppercase tracking-wider">Active Subscribers</div>
         </GlassCard>

         <GlassCard padding="lg" className="border-t-2 border-t-rose-400">
            <div className="flex justify-between items-start mb-4">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <Users className="w-5 h-5 text-rose-400" />
               </div>
               <span className="flex items-center gap-1 text-xs font-medium text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full">
                 <ArrowDownRight className="w-3 h-3" /> 1.2%
               </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">2.4%</div>
            <div className="text-xs text-aetheris-muted uppercase tracking-wider">Monthly Churn Rate</div>
         </GlassCard>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Chart Area (Mocked visually) */}
        <div className="lg:col-span-2">
           <GlassCard padding="lg" className="h-full flex flex-col">
              <h3 className="text-white font-semibold mb-6">Revenue Growth</h3>
              <div className="flex-1 relative flex items-end gap-2 pt-10 pb-4 h-64 border-b border-white/10">
                 {/* Mock Chart Bars */}
                 {[40, 45, 30, 60, 55, 70, 85, 80, 95, 100, 90, 110].map((height, i) => (
                    <div key={i} className="flex-1 relative group h-full flex items-end justify-center">
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: `${height}%` }}
                         transition={{ duration: 1, delay: i * 0.05 }}
                         className="w-full max-w-[40px] bg-aetheris-cyan/20 border-t-2 border-aetheris-cyan rounded-t-sm group-hover:bg-aetheris-cyan/40 transition-colors relative"
                       >
                          {/* Tooltip on hover */}
                          <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-xs text-white pointer-events-none transition-opacity whitespace-nowrap border border-white/10 shadow-xl">
                            ${(height * 1.5).toFixed(1)}k
                          </div>
                       </motion.div>
                    </div>
                 ))}
                 
                 {/* Y-Axis mock lines */}
                 <div className="absolute top-0 left-0 w-full h-px bg-white/5" />
                 <div className="absolute top-1/4 left-0 w-full h-px bg-white/5" />
                 <div className="absolute top-2/4 left-0 w-full h-px bg-white/5" />
                 <div className="absolute top-3/4 left-0 w-full h-px bg-white/5" />
              </div>
              <div className="flex justify-between mt-2 text-xs text-aetheris-muted">
                 <span>Jun</span>
                 <span>Jul</span>
                 <span>Aug</span>
                 <span>Sep</span>
                 <span>Oct</span>
                 <span>Nov</span>
                 <span>Dec</span>
                 <span>Jan</span>
                 <span>Feb</span>
                 <span>Mar</span>
                 <span>Apr</span>
                 <span>May</span>
              </div>
           </GlassCard>
        </div>

        {/* Plan Breakdown */}
        <div>
           <GlassCard padding="lg" className="h-full">
              <h3 className="text-white font-semibold mb-6">Plan Breakdown</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                         <div className="text-white font-medium">Enterprise</div>
                         <div className="text-xs text-aetheris-muted">42 subscribers</div>
                       </div>
                       <div className="text-right">
                         <div className="text-white font-medium">$84,000</div>
                         <div className="text-xs text-emerald-400">59% of MRR</div>
                       </div>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-aetheris-violet w-[59%]" />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                         <div className="text-white font-medium">Growth</div>
                         <div className="text-xs text-aetheris-muted">85 subscribers</div>
                       </div>
                       <div className="text-right">
                         <div className="text-white font-medium">$67,915</div>
                         <div className="text-xs text-emerald-400">31% of MRR</div>
                       </div>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-aetheris-cyan w-[31%]" />
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <div>
                         <div className="text-white font-medium">Startup</div>
                         <div className="text-xs text-aetheris-muted">215 subscribers</div>
                       </div>
                       <div className="text-right">
                         <div className="text-white font-medium">$64,285</div>
                         <div className="text-xs text-emerald-400">10% of MRR</div>
                       </div>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-400 w-[10%]" />
                    </div>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>

      {/* Recent Transactions */}
      <GlassCard padding="none" className="overflow-hidden">
         <div className="p-6 border-b border-white/10 flex justify-between items-center">
            <h3 className="text-white font-semibold">Recent Transactions</h3>
            <button className="text-sm text-aetheris-cyan hover:underline">View All</button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/5 text-xs uppercase tracking-wider text-aetheris-muted">
                     <th className="p-4 font-medium">Transaction ID</th>
                     <th className="p-4 font-medium">Company</th>
                     <th className="p-4 font-medium">Plan</th>
                     <th className="p-4 font-medium text-right">Amount</th>
                     <th className="p-4 font-medium">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {TRANSACTIONS.map(txn => (
                     <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-sm text-white/80">{txn.id}</td>
                        <td className="p-4">
                           <div className="text-sm font-medium text-white">{txn.company}</div>
                           <div className="text-xs text-aetheris-muted">{txn.date}</div>
                        </td>
                        <td className="p-4 text-sm text-aetheris-muted">{txn.plan}</td>
                        <td className="p-4 text-sm font-medium text-white text-right">${txn.amount}</td>
                        <td className="p-4">
                           {txn.status === 'completed' 
                              ? <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-bold rounded border border-emerald-500/20">Completed</span>
                              : <span className="px-2 py-1 bg-rose-500/10 text-rose-400 text-[10px] uppercase font-bold rounded border border-rose-500/20">Failed</span>
                           }
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
