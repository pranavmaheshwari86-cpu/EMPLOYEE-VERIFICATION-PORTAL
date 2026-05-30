"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassAvatar } from "@/components/ui/glass-avatar";
import { GlassBadge } from "@/components/ui/glass-badge";
import {
  Users,
  Star,
  Calendar,
  Mail,
  ChevronDown,
  Filter,
  Search,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

type Stage = "applied" | "shortlisted" | "interview" | "offered" | "rejected";

interface Candidate {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  matchScore: number;
  skills: string[];
  experience: string;
  stage: Stage;
  appliedDate: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Elena Rodriguez",
    email: "elena.r@email.com",
    role: "AI Engineer",
    avatar: "https://i.pravatar.cc/150?u=elena",
    matchScore: 98,
    skills: ["Python", "TensorFlow", "MLOps"],
    experience: "5 Years",
    stage: "shortlisted",
    appliedDate: "2026-05-20",
  },
  {
    id: "2",
    name: "Marcus Chen",
    email: "marcus.c@email.com",
    role: "AI Engineer",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    matchScore: 92,
    skills: ["PyTorch", "NLP", "AWS"],
    experience: "4 Years",
    stage: "applied",
    appliedDate: "2026-05-22",
  },
  {
    id: "3",
    name: "Priya Sharma",
    email: "priya.s@email.com",
    role: "Full Stack Engineer",
    avatar: "https://i.pravatar.cc/150?u=priya",
    matchScore: 95,
    skills: ["React", "Node.js", "PostgreSQL"],
    experience: "6 Years",
    stage: "interview",
    appliedDate: "2026-05-18",
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@email.com",
    role: "DevOps Engineer",
    avatar: "https://i.pravatar.cc/150?u=james",
    matchScore: 88,
    skills: ["Kubernetes", "Terraform", "CI/CD"],
    experience: "3 Years",
    stage: "offered",
    appliedDate: "2026-05-15",
  },
  {
    id: "5",
    name: "Aisha Patel",
    email: "aisha.p@email.com",
    role: "AI Engineer",
    avatar: "https://i.pravatar.cc/150?u=aisha",
    matchScore: 78,
    skills: ["Python", "Data Science", "R"],
    experience: "2 Years",
    stage: "rejected",
    appliedDate: "2026-05-21",
  },
];

const stageConfig: Record<Stage, { label: string; color: string; icon: React.ElementType }> = {
  applied: { label: "Applied", color: "text-aetheris-blue", icon: Clock },
  shortlisted: { label: "Shortlisted", color: "text-aetheris-amber", icon: Star },
  interview: { label: "Interview", color: "text-aetheris-violet", icon: Calendar },
  offered: { label: "Offered", color: "text-aetheris-emerald", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-aetheris-rose", icon: XCircle },
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>(MOCK_CANDIDATES);
  const [filterStage, setFilterStage] = useState<Stage | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCandidates = candidates.filter((c) => {
    const matchStage = filterStage === "all" || c.stage === filterStage;
    const matchSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStage && matchSearch;
  });

  const moveToStage = (candidateId: string, newStage: Stage) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, stage: newStage } : c))
    );
  };

  const stageCountMap = candidates.reduce(
    (acc, c) => {
      acc[c.stage] = (acc[c.stage] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white mb-1">Talent Pipeline</h1>
        <p className="text-aetheris-muted text-sm">
          View applicants, shortlist candidates, and schedule interviews.
        </p>
      </div>

      {/* Stage Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(Object.entries(stageConfig) as [Stage, typeof stageConfig[Stage]][]).map(
          ([stage, config]) => {
            const Icon = config.icon;
            return (
              <button
                key={stage}
                onClick={() => setFilterStage(filterStage === stage ? "all" : stage)}
                className={`p-4 rounded-xl border transition-all text-left ${
                  filterStage === stage
                    ? "bg-white/[0.06] border-white/20 shadow-lg"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${config.color}`} />
                  <span className="text-xs text-aetheris-muted capitalize">{config.label}</span>
                </div>
                <div className="text-2xl font-bold text-white">{stageCountMap[stage] || 0}</div>
              </button>
            );
          }
        )}
      </div>

      {/* Search & Filter Bar */}
      <GlassCard padding="md">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-aetheris-subtle absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-aetheris-cyan/50 transition-all"
            />
          </div>
          <button
            onClick={() => {
              setFilterStage("all");
              setSearchQuery("");
            }}
            className="px-4 py-2 rounded-xl text-sm text-aetheris-muted hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.05] transition-all flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </GlassCard>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.length === 0 ? (
          <GlassCard padding="lg" className="text-center">
            <Users className="w-10 h-10 text-aetheris-subtle mx-auto mb-3" />
            <p className="text-aetheris-muted">No candidates found for this filter.</p>
          </GlassCard>
        ) : (
          filteredCandidates.map((candidate) => {
            const stageInfo = stageConfig[candidate.stage];
            const StageIcon = stageInfo.icon;
            return (
              <GlassCard
                key={candidate.id}
                padding="md"
                className="hover:bg-white/[0.04] transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <GlassAvatar
                      src={candidate.avatar}
                      fallback={candidate.name[0]}
                      size="lg"
                      ring="cyan"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-bold text-white">{candidate.name}</span>
                        <GlassBadge variant="verified" size="sm">
                          Verified
                        </GlassBadge>
                      </div>
                      <div className="text-sm text-aetheris-muted mb-1">
                        {candidate.role} • {candidate.experience}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-xs px-2 py-0.5 rounded bg-white/5 text-aetheris-subtle"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="text-center px-4">
                    <div
                      className={`text-2xl font-mono font-bold ${
                        candidate.matchScore >= 90
                          ? "text-aetheris-emerald"
                          : candidate.matchScore >= 80
                          ? "text-aetheris-amber"
                          : "text-aetheris-muted"
                      }`}
                    >
                      {candidate.matchScore}%
                    </div>
                    <div className="text-xs text-aetheris-muted">Match</div>
                  </div>

                  {/* Stage Badge */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                    <StageIcon className={`w-4 h-4 ${stageInfo.color}`} />
                    <span className={`text-sm font-medium ${stageInfo.color}`}>
                      {stageInfo.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {candidate.stage === "applied" && (
                      <GlassButton
                        size="sm"
                        variant="secondary"
                        icon={<Star className="w-3.5 h-3.5" />}
                        onClick={() => moveToStage(candidate.id, "shortlisted")}
                      >
                        Shortlist
                      </GlassButton>
                    )}
                    {candidate.stage === "shortlisted" && (
                      <GlassButton
                        size="sm"
                        variant="primary"
                        icon={<Calendar className="w-3.5 h-3.5" />}
                        onClick={() => moveToStage(candidate.id, "interview")}
                      >
                        Schedule Interview
                      </GlassButton>
                    )}
                    {candidate.stage === "interview" && (
                      <GlassButton
                        size="sm"
                        variant="primary"
                        icon={<CheckCircle className="w-3.5 h-3.5" />}
                        onClick={() => moveToStage(candidate.id, "offered")}
                      >
                        Send Offer
                      </GlassButton>
                    )}
                    {(candidate.stage === "applied" || candidate.stage === "shortlisted" || candidate.stage === "interview") && (
                      <button
                        onClick={() => moveToStage(candidate.id, "rejected")}
                        className="p-2 rounded-lg text-aetheris-subtle hover:text-aetheris-rose hover:bg-aetheris-rose/10 transition-colors"
                        title="Reject"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    <a
                      href={`mailto:${candidate.email}`}
                      className="p-2 rounded-lg text-aetheris-subtle hover:text-aetheris-cyan hover:bg-aetheris-cyan/10 transition-colors"
                      title="Send Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            );
          })
        )}
      </div>
    </div>
  );
}
