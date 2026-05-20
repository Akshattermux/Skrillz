import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string | null;
  specialty?: string;
  bio?: string;
  role: "patient" | "doctor" | "student" | "teacher";
  balance: number;
  purchasedClasses: string[];
  subscriptionStatus: "none" | "monthly" | "yearly";
}

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  addPurchase: (id: string) => void;
  setSubscription: (status: "monthly" | "yearly") => void;
  addEarning: (amount: number, source: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>({
    name: "Dr. Akshat Sharma",
    email: "doctor@gmail.com",
    avatar: null,
    specialty: "Senior Medical Instructor",
    bio: "Chief Medical Officer at Skrillz, specializing in surgical education and telemedicine.",
    role: "doctor",
    balance: 1450.75,
    purchasedClasses: ["c1", "c3"],
    subscriptionStatus: "none",
  });

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const addPurchase = (id: string) => {
    setUser((prev) => ({
      ...prev,
      purchasedClasses: [...prev.purchasedClasses, id],
    }));
  };

  const setSubscription = (status: "monthly" | "yearly") => {
    setUser((prev) => ({
      ...prev,
      subscriptionStatus: status,
    }));
  };

  const addEarning = (amount: number, source: string) => {
    setUser((prev) => ({
      ...prev,
      balance: prev.balance + amount,
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser, addPurchase, setSubscription, addEarning }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
