"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Building2, MessageSquare, Search } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { JOBS_DATA } from "@/lib/jobs-data";

export default function MessagesPage() {
  const { appliedJobs, jobs } = useAppStore();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  
  // Combine mock JOBS_DATA with store jobs
  const allJobs = [...JOBS_DATA, ...jobs];
  
  // Find unique companies the user has applied to
  const appliedCompanies = appliedJobs.map(jobId => {
    const job = allJobs.find(j => String(j.id) === String(jobId));
    return job ? { id: job.id, name: (job as any).company || (job as any).companyName || "Unknown Company" } : null;
  }).filter((c, index, self) => c !== null && self.findIndex(t => t?.name === c.name) === index);

  const getWelcomeMessage = (companyName: string) => {
    const job = allJobs.find(j => ((j as any).company || (j as any).companyName) === companyName && appliedJobs.includes(String(j.id)));
    if (job) {
      const j: any = job;
      const skills = j.skills ? j.skills.join(", ") : "React, Node.js, TypeScript, Python";
      const experience = j.experience || "3+ years";
      const languages = j.languages ? j.languages.join(", ") : "English";
      
      return `Welcome to the chat with ${companyName}. We have received your application for the ${j.title} position!

Here is a summary of the role requirements:
• Location: ${j.location}
• Job Type: ${j.type}
• Tech Stack & Skills: ${skills}
• Languages: ${languages}
• Minimum Experience: ${experience}

How can our HR team assist you today?`;
    }
    return `Welcome to the chat with ${companyName}. How can our HR team assist you today?`;
  };

  const [messages, setMessages] = useState<Record<string, any[]>>({});
  const [inputValue, setInputValue] = useState("");
  const [timeNow, setTimeNow] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeNow(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  useEffect(() => {
    if (appliedCompanies.length > 0 && !activeChat) {
      setActiveChat(String(appliedCompanies[0]?.name));
    }
  }, [appliedCompanies, activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !activeChat) return;

    const chatMsgs = messages[activeChat] || [
      { id: 'welcome', text: getWelcomeMessage(activeChat), sender: "company", time: timeNow }
    ];

    setMessages({
      ...messages,
      [activeChat]: [...chatMsgs, {
        id: Date.now(),
        text: inputValue,
        sender: "me",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]
    });
    setInputValue("");
  };

  const currentMessages = activeChat ? (messages[activeChat] || [
    { id: 'welcome', text: getWelcomeMessage(activeChat), sender: "company", time: timeNow }
  ]) : [];

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-white mb-1">Messages</h1>
        <p className="text-[var(--color-on-surface-variant)] text-sm">Direct encrypted channel with your company HR.</p>
      </div>

      <div className="liquid-glass flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/3 border-r border-[var(--color-glass-border)]/20 flex flex-col bg-[var(--color-surface-variant)]/10">
          <div className="p-4 border-b border-[var(--color-glass-border)]/20">
            <h3 className="text-sm font-medium text-white mb-3">Applied Companies</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-aetheris-muted" />
              <input 
                type="text" 
                placeholder="Search chats..."
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-aetheris-cyan/50"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {appliedCompanies.length === 0 ? (
              <div className="p-6 text-center">
                <MessageSquare className="w-8 h-8 text-aetheris-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm text-aetheris-muted">You haven't applied to any jobs yet.</p>
                <p className="text-xs text-aetheris-muted/70 mt-1">Apply to a job to start a conversation.</p>
              </div>
            ) : (
              appliedCompanies.map((company: any) => (
                <button
                  key={company.name}
                  onClick={() => setActiveChat(company.name)}
                  className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${
                    activeChat === company.name ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary-fixed-dim)]/20 flex items-center justify-center border border-[var(--color-primary-fixed-dim)]/30 shrink-0">
                    <Building2 className="w-5 h-5 text-[var(--color-primary-fixed-dim)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate">{company.name}</h4>
                    <p className="text-xs text-aetheris-muted truncate">HR Department</p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface-variant)]/5">
          {!activeChat ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
              <MessageSquare className="w-12 h-12 text-aetheris-muted mb-4 opacity-30" />
              <h3 className="text-lg font-medium text-white mb-2">No Chat Selected</h3>
              <p className="text-sm text-aetheris-muted max-w-sm">
                {appliedCompanies.length === 0 
                  ? "Head over to the Job Board and apply for a position to start communicating with employers."
                  : "Select a company from the left sidebar to view your conversation."}
              </p>
            </div>
          ) : (
            <>
              <div className="p-4 border-b border-[var(--color-glass-border)]/20 flex items-center gap-3 bg-[var(--color-surface-variant)]/10">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-fixed-dim)]/20 flex items-center justify-center border border-[var(--color-primary-fixed-dim)]/30">
                  <Building2 className="w-5 h-5 text-[var(--color-primary-fixed-dim)]" />
                </div>
                <div>
                  <h2 className="text-sm font-medium text-[var(--color-on-surface)]">{activeChat} - HR</h2>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Online
                  </p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-lg ${
                      msg.sender === 'me' 
                        ? 'bg-[var(--color-primary-fixed-dim)] text-black rounded-br-sm' 
                        : 'bg-[var(--color-surface-variant)]/40 text-[var(--color-on-surface)] border border-[var(--color-glass-border)]/20 rounded-bl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[10px] mt-1 ${msg.sender === 'me' ? 'text-black/60 text-right' : 'text-[var(--color-on-surface-variant)]'}`}>
                        {msg.time}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-[var(--color-surface-variant)]/10 border-t border-[var(--color-glass-border)]/20">
                <form onSubmit={handleSend} className="flex gap-2">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message securely..." 
                    className="flex-1 bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/20 rounded-full px-4 py-2 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)]/50 focus:outline-none focus:border-[var(--color-primary-fixed-dim)]/50 transition-colors"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-[var(--color-primary-fixed-dim)] flex items-center justify-center text-black hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
