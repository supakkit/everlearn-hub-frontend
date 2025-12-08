"use client";

import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { DashBoardWelcome } from "@/components/dashboard/DashBoardWelcome";
import { Alert, Container } from "@mui/material";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { navigation } from "@/data/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardResponse } from "@/types/api/api-types";
import { dashboardAPI } from "@/services/dashboard";
import { DashBoardStats } from "@/components/dashboard/DashBoardStats";
import DashboardTabs from "@/components/dashboard/DashBoardTab";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<DashboardResponse>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const dashboard = await dashboardAPI.getDashboardData();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDashboard(dashboard);
    } catch (err) {
      setError("Failed to fetch dashboard");
      console.error("Failed to fetch dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const [learning, completed] = useMemo(
    () =>
      dashboard?.enrolledCourses.reduce(
        (acc, val) => {
          acc[val.progressPercentage === 100 ? 1 : 0].push(val);
          return acc;
        },
        [[], []] as DashboardResponse["enrolledCourses"][]
      ) || [],
    [dashboard]
  );

  if (!user) throw new Error("Unauthorized");
  if (loading) return <DashboardSkeleton />;
  if (!dashboard || error)
    return (
      <Alert
        severity="error"
        color="error"
        sx={{ width: 200, fontWeight: 500, mt: 2, mx: "auto" }}
      >
        {error}
      </Alert>
    );

  return (
    <Container sx={{ py: 6 }}>
      <DashBoardWelcome user={user} />
      <DashBoardStats userStats={dashboard.stats} />
      <DashboardTabs learning={learning} completed={completed} />
      <DashboardFooter />
    </Container>
  );
}
