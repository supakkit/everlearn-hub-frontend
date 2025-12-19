"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { navigation } from "@/data/navigation";

export function NonAuthOnly({ children }: { children: React.ReactNode }) {
  const { user, userLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userLoading && user) {
      router.replace(navigation.dashboard.href);
    }
  }, [userLoading, user, router]);

  if (userLoading) return null;
  if (user) return null;

  return <>{children}</>;
}
