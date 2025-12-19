"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { navigation } from "@/data/navigation";

export function AdminOnly({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, userLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && !user) {
      router.replace(navigation.login.href);
    } else if (!userLoading && !isAdmin) {
      router.replace(navigation.dashboard.href);
    }
  }, [userLoading, user, router, isAdmin]);

  if (userLoading) return null;
  if (!user) return null;
  if (!isAdmin) return null;

  return <>{children}</>;
}
