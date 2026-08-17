"use client";

import React, { useState } from "react";
import { Plus, Code2, Globe, Code, X } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassInput } from "@/components/ui/glass-input";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { useEffect } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

const DEFAULT_PROJECTS: Project[] = [];

export default function ProjectsPage() {
  const { user } = useAppStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "", techStack: "", demoUrl: "", repoUrl: "" });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const project: Project = {
      id: `proj-${Date.now()}`,
      name: newProject.name,
      description: newProject.description,
      techStack: newProject.techStack.split(",").map(s => s.trim()).filter(Boolean),
      demoUrl: newProject.demoUrl || undefined,
      repoUrl: newProject.repoUrl || undefined
    };

    setProjects([project, ...projects]);
    setNewProject({ name: "", description: "", techStack: "", demoUrl: "", repoUrl: "" });
    setIsAdding(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pl-2">
        <div>
          <h1 className="text-4xl text-white font-serif italic" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Projects <span className="text-[#e8d5c4] not-italic">Portfolio</span>.
          </h1>
        </div>
        <GlassButton variant="primary" onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </GlassButton>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddProject} className="liquid-glass-strong p-6 rounded-[24px] border border-aetheris-cyan/30 mb-8 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-medium text-white">Add New Project</h2>
                <button type="button" onClick={() => setIsAdding(false)} className="p-2 text-aetheris-muted hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-aetheris-muted mb-1.5">Project Name *</label>
                    <GlassInput 
                      label="Project Name"
                      required
                      value={newProject.name}
                      onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                      placeholder="e.g. Nexus Core Engine" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-aetheris-muted mb-1.5">Tech Stack (comma separated)</label>
                    <GlassInput 
                      label="Tech Stack"
                      value={newProject.techStack}
                      onChange={(e) => setNewProject({...newProject, techStack: e.target.value})}
                      placeholder="e.g. React, Node.js, GraphQL" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-aetheris-muted mb-1.5">Live Demo URL (optional)</label>
                    <GlassInput 
                      label="Live Demo URL"
                      value={newProject.demoUrl}
                      onChange={(e) => setNewProject({...newProject, demoUrl: e.target.value})}
                      placeholder="https://your-demo.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-aetheris-muted mb-1.5">Repository URL (optional)</label>
                    <GlassInput 
                      label="Repository URL"
                      value={newProject.repoUrl}
                      onChange={(e) => setNewProject({...newProject, repoUrl: e.target.value})}
                      placeholder="https://github.com/..." 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-aetheris-muted mb-1.5">Description</label>
                  <textarea 
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    className="w-full h-full min-h-[150px] bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-aetheris-cyan/50 resize-none"
                    placeholder="Describe the problem your project solves..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-2 rounded-xl text-aetheris-muted hover:text-white transition-colors">
                  Cancel
                </button>
                <GlassButton type="submit" variant="primary">
                  Save Project
                </GlassButton>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="liquid-glass p-6 rounded-[24px] border border-[var(--color-glass-border)]/10 flex flex-col hover:border-aetheris-cyan/30 transition-colors">
            
            <div className="mb-4">
              <h3 className="text-xl font-medium text-white mb-2">{project.name}</h3>
              <p className="text-sm text-[var(--color-on-surface-variant)] leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-medium text-aetheris-muted uppercase tracking-wider mb-3">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <div key={tech} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-aetheris-muted flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-aetheris-violet" /> {tech}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/5">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-sm text-aetheris-cyan hover:text-white transition-colors flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-aetheris-violet hover:text-white transition-colors flex items-center gap-1.5">
                  <Code className="w-4 h-4" /> Source Code
                </a>
              )}
              {!project.demoUrl && !project.repoUrl && (
                <span className="text-sm text-aetheris-muted flex items-center gap-1.5">
                  <Code className="w-4 h-4" /> Internal / Confidential
                </span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
