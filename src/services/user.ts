import { User } from "@/types/api/api-types";
import api from "./api";

export const userAPI = {
  getProfile: async (): Promise<User> => {
    const res = await api.get("/users/me");
    return res.data;
  },
};
