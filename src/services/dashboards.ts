import { DashboardResponse } from "@/types/api/api-types";
import api from "./api";

export const dashboardAPI = {
  getDashboardData: async (): Promise<DashboardResponse> => {
    const res = await api.get("/dashboard/me");
    return res.data;
  },
};
