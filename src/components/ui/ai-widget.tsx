"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";

type Message = {
  id: string;
  role: "bot" | "user";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  id: "init-1",
  role: "bot",
  content: "Hi! I'm AETHERIS, your AI assistant. How can I help you find talent or opportunities today?"
};

export function AIWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentInput
    };

    setInputValue("");

    let responseText = "I can help with that! However, my core systems are currently in demo mode. Try logging in as an Employer to post a job or as a Candidate to build your profile.";
    const lowerInput = currentInput.toLowerCase();
    if (lowerInput.includes("job") || lowerInput.includes("hiring")) {
      responseText = "To find or post jobs, please navigate to our Jobs portal or log in to your dashboard. We use advanced AI matching to connect the right people.";
    } else if (lowerInput.includes("verify") || lowerInput.includes("trust")) {
      responseText = "AETHERIS uses a multi-layered verification system checking Identity, Education, and Employment history cryptographically to ensure a 99.9% trust rating.";
    } else if (lowerInput.includes("pricing") || lowerInput.includes("cost")) {
      responseText = "Our employer plans start at $299/mo for Startups. Candidates can use the platform entirely for free! You can see full details in the Employer dashboard.";
    }

    setMessages(prev => [
      ...prev,
      userMessage,
      {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: responseText
      }
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-aetheris-cyan text-[#0a0a0a] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-110 transition-transform z-50 group"
          >
            <Sparkles className="w-6 h-6" />
            <span className="absolute right-full mr-4 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with AETHERIS
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] z-50 flex flex-col rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/20 bg-[#0a0a0a]/90 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-aetheris-cyan/20 flex items-center justify-center border border-aetheris-cyan/30">
                  <Bot className="w-4 h-4 text-aetheris-cyan" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AETHERIS Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-aetheris-muted uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${
                    msg.role === 'bot' ? 'bg-white/5 border border-white/10 text-aetheris-cyan' : 'bg-aetheris-violet/20 border border-aetheris-violet/30 text-aetheris-violet'
                  }`}>
                    {msg.role === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.role === 'bot' 
                      ? 'bg-white/5 text-white/90 rounded-tl-none border border-white/5' 
                      : 'bg-aetheris-violet/10 text-white rounded-tr-none border border-aetheris-violet/20'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-aetheris-cyan shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5 border border-white/5 w-16">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} className="w-1.5 h-1.5 rounded-full bg-aetheris-cyan" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 rounded-full bg-aetheris-cyan" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 rounded-full bg-aetheris-cyan" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Ask AETHERIS anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-aetheris-cyan transition-colors"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-1.5 bg-aetheris-cyan text-[#0a0a0a] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
