"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "@/services/auth";
import { useRouter } from "next/navigation";
import { User } from "@/types/api/api-types";
import { navigation } from "@/data/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load session on initial page load
  useEffect(() => {
    const loadSession = async () => {
      try {
        // refreshToken is automatically sent via cookie
        await authAPI.refreshToken();
        const profile = await authAPI.getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string) => {
    await authAPI.login(email, password);
    const profile = await authAPI.getProfile();
    setUser(profile);
    router.push(navigation.dashboard.href);
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
    router.push(navigation.login.href);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
