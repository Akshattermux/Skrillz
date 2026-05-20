import React, { createContext, useContext, useState, ReactNode } from "react";

export interface AppNotification {
  id: string;
  type: "live" | "milestone" | "enrollment" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: "n1",
    type: "live",
    title: "Upcoming Live Class",
    message: "Your 'Advanced Cardiology' session starts in 5 minutes. Get ready!",
    time: "Just Now",
    read: false,
  },
  {
    id: "n2",
    type: "milestone",
    title: "Recorded Milestone",
    message: "Your lecture 'Neurological Disorders' has reached 5,000 views!",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "n3",
    type: "enrollment",
    title: "New Enrollment",
    message: "Sarah Jenkins just enrolled in your 'Medical Ethics' masterclass.",
    time: "3 hours ago",
    read: false,
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};
