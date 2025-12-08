import { User } from "@/types/api/api-types";
import api from "./api";

export const userAPI = {
  getProfile: async (): Promise<User> => {
    const res = await api.get("/users/me");
    return res.data;
  },

  updateProfile: async (data: FormData): Promise<User> => {
    const res = await api.patch("/users/me", data);
    return res.data;
  },

  deleteAccount: async () => {
    await api.delete("/users/me");
  }
};
