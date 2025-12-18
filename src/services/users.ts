import {
  AdminUpdateUserDto,
  FullDetailUserResponse,
  GetFullDetailUsersParams,
  GetFullDetailUsersResponse,
  User,
} from "@/types/api/api-types";
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
  },

  getFullDetailUsers: async (
    params: GetFullDetailUsersParams
  ): Promise<GetFullDetailUsersResponse> => {
    const queryString = new URLSearchParams(params).toString();
    const res = await api.get(`admin/users?${queryString}`);
    return res.data;
  },

  adminUpdateUser: async (
    userId: string,
    adminUpdateUserDto: AdminUpdateUserDto
  ): Promise<FullDetailUserResponse> => {
    const res = await api.patch(`admin/users/${userId}`, adminUpdateUserDto);
    return res.data;
  },
};
