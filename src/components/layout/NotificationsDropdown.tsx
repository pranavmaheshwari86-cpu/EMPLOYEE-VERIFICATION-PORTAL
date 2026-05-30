"use client";

import { useState, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import { useSocket } from "@/components/providers/SocketProvider";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (data: { message: string }) => {
      setNotifications((prev) => [
        {
          id: Math.random().toString(36).substr(2, 9),
          message: data.message,
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...prev,
      ]);
    });

    return () => {
      socket.off("notification");
    };
  }, [socket]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        aria-expanded={isOpen}
        className="relative p-2 rounded-full bg-[var(--color-surface-variant)]/30 border border-[var(--color-glass-border)]/20 hover:bg-[var(--color-surface-variant)]/50 transition-colors"
      >
        <Bell className="w-5 h-5 text-[var(--color-on-surface-variant)]" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-error)] border-2 border-[var(--color-surface-container-lowest)]"></span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[var(--color-surface-container)] border border-[var(--color-glass-border)]/20 rounded-xl shadow-xl overflow-hidden z-50 backdrop-blur-xl">
          <div className="flex items-center justify-between p-4 border-b border-[var(--color-glass-border)]/20">
            <h3 className="font-medium text-[var(--color-on-surface)]">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={markAllAsRead}
                aria-label="Mark all as read"
                className="text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-fixed)] transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-[var(--color-on-surface-variant)] text-sm">
                No new notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-[var(--color-glass-border)]/10 flex gap-3 transition-colors ${notification.read ? 'opacity-60' : 'bg-[var(--color-primary-container)]/10 hover:bg-[var(--color-primary-container)]/20'}`}
                >
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-on-surface)]">{notification.message}</p>
                    <p className="text-xs text-[var(--color-on-surface-variant)] mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  {!notification.read && (
                    <button onClick={() => markAsRead(notification.id)} aria-label="Mark notification as read" className="text-[var(--color-primary)] self-start mt-1">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
