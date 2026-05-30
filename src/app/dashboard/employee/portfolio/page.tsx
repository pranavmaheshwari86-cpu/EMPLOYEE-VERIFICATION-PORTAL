"use client";

import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Plus, ExternalLink, Code2, FolderGit2 } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "Neural Network Trading Engine",
      description: "High-frequency trading system built with Rust and PyTorch. Achieved 2.3ms average latency processing market data streams.",
      tags: ["Rust", "Python", "PyTorch", "Kafka"],
      link: "github.com/alexchen/trading-engine",
      verified: true,
    },
    {
      id: 2,
      title: "Distributed KV Store",
      description: "A distributed key-value store implementing the Raft consensus algorithm for high availability and fault tolerance.",
      tags: ["Go", "gRPC", "Distributed Systems"],
      link: "github.com/alexchen/raft-kv",
      verified: true,
    },
    {
      id: 3,
      title: "AI Code Assistant",
      description: "VS Code extension that uses local LLMs to provide real-time code suggestions and refactoring assistance.",
      tags: ["TypeScript", "React", "LLMs", "Extension API"],
      link: "github.com/alexchen/code-assist",
      verified: false,
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white mb-1">Portfolio & Projects</h1>
          <p className="text-aetheris-muted text-sm">Showcase your technical achievements and verified contributions.</p>
        </div>
        <GlassButton variant="primary" icon={<Plus className="w-4 h-4" />}>
          Add Project
        </GlassButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <GlassCard key={project.id} padding="lg" className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg glass-sm flex items-center justify-center text-aetheris-cyan bg-aetheris-cyan/10">
                <FolderGit2 className="w-5 h-5" />
              </div>
              {project.verified && (
                <span className="text-[10px] font-medium tracking-wider text-aetheris-emerald uppercase px-2 py-1 bg-aetheris-emerald/10 rounded-md border border-aetheris-emerald/20">
                  Verified Commits
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-aetheris-muted mb-6 flex-1">{project.description}</p>
            
            <div className="space-y-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 text-aetheris-subtle border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a href={`https://${project.link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-aetheris-cyan hover:text-aetheris-cyan/80 transition-colors">
                  <Code2 className="w-3.5 h-3.5" />
                  View Repository
                </a>
                <ExternalLink className="w-3.5 h-3.5 text-aetheris-muted" />
              </div>
            </div>
          </GlassCard>
        ))}

        {/* Empty State / Add New */}
        <button className="h-full min-h-[300px] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-aetheris-muted hover:text-white hover:border-aetheris-cyan/30 hover:bg-aetheris-cyan/5 transition-all group">
          <div className="w-12 h-12 rounded-full glass-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform bg-white/5">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-medium">Connect Repository</span>
          <span className="text-xs mt-2 text-aetheris-subtle">Import projects from GitHub/GitLab</span>
        </button>
      </div>
    </div>
  );
}
