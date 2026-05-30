"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, X, Send } from "lucide-react";
import { useSocket } from "@/components/providers/SocketProvider";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export function MessagingDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { socket } = useSocket();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data: { sender: string; text: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          sender: data.sender,
          text: data.text,
          timestamp: new Date().toISOString(),
          isMe: data.sender === "Me", // Determine if it's sent by current user based on your logic
        },
      ]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket) return;

    // Assuming the server listens for 'sendMessage'
    socket.emit("sendMessage", { text: inputValue });
    
    // Optimistically add to UI if needed, or rely on the server to broadcast back to the sender as well
    setMessages((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        sender: "Me",
        text: inputValue,
        timestamp: new Date().toISOString(),
        isMe: true,
      },
    ]);

    setInputValue("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open Messaging Drawer"
        aria-expanded={isOpen}
        className="relative p-2 rounded-full bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/20 hover:bg-[var(--color-surface-variant)]/50 transition-colors"
      >
        <MessageSquare className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
      </button>

      {mounted && createPortal(
        <>
          {/* Backdrop */}
          {isOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Drawer */}
          <div 
            className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[var(--color-surface-container)] border-l border-[var(--color-glass-border)]/20 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-glass-border)]/20 bg-[var(--color-surface-container-lowest)]">
          <h2 className="text-lg font-medium text-[var(--color-on-surface)] flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Messages
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            aria-label="Close Messaging Drawer"
            className="p-2 rounded-full hover:bg-[var(--color-surface-variant)]/50 transition-colors text-[var(--color-on-surface-variant)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[var(--color-surface)]/50">
          {messages.length === 0 ? (
            <div className="m-auto text-center text-[var(--color-on-surface-variant)] flex flex-col items-center gap-2">
              <MessageSquare className="w-8 h-8 opacity-50" />
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col max-w-[80%] ${msg.isMe ? 'self-end' : 'self-start'}`}
              >
                {!msg.isMe && <span className="text-xs text-[var(--color-on-surface-variant)] mb-1 ml-1">{msg.sender}</span>}
                <div 
                  className={`px-4 py-2 rounded-2xl ${
                    msg.isMe 
                      ? 'bg-[var(--color-primary)] text-[var(--color-on-primary)] rounded-tr-sm' 
                      : 'bg-[var(--color-surface-variant)] text-[var(--color-on-surface)] rounded-tl-sm border border-[var(--color-glass-border)]/10'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className={`text-[10px] text-[var(--color-on-surface-variant)] mt-1 ${msg.isMe ? 'text-right mr-1' : 'ml-1'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-[var(--color-glass-border)]/20 bg-[var(--color-surface-container-lowest)]">
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              aria-label="Message text"
              className="flex-1 bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/20 rounded-full px-4 py-2 text-sm text-[var(--color-on-surface)] placeholder:text-[var(--color-on-surface-variant)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-[var(--color-surface-variant)]/50 transition-all"
            />
            <button 
              type="submit"
              disabled={!inputValue.trim()}
              aria-label="Send Message"
              className="p-2 rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary-fixed)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-10 h-10"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      </>, document.body)}
    </>
  );
}
