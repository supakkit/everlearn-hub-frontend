"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authAPI } from "@/services/auth";
import { User } from "@/types/api/api-types";
import { userAPI } from "@/services/users";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  userLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthUser: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  // Load session on initial page load
  useEffect(() => {
    const loadSession = async () => {
      try {
        // refreshToken is automatically sent via cookie
        await authAPI.refreshToken();
        const profile = await userAPI.getProfile();
        setUser(profile);
      } catch {
        setUser(null);
      } finally {
        setUserLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await authAPI.login(email, password);
    const profile = await userAPI.getProfile();
    setUser(profile);
  }, []);

  const logout = useCallback(async () => {
    await authAPI.logout();
    setUser(null);
  }, []);

  const isAuthUser = useMemo(() => user !== null, [user]);
  const isAdmin = useMemo(() => user !== null && user.role === "ADMIN", [user]);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userLoading, login, logout, isAuthUser, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
