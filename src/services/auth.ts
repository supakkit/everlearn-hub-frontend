import { LoginDto, LoginResponse, RefreshTokenResponse, SignUpDto, SignUpResponse, User } from "@/types/api/api-types";
import api from "./api";
import { getDeviceId } from "@/utils/getDeviceId";

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const loginDto: LoginDto = { email, password, deviceId: getDeviceId() };
    const res = await api.post("/auth/login", loginDto);
    return res.data;
  },

  signup: async (dto: SignUpDto): Promise<SignUpResponse> => {
    const res = await api.post("/auth/signup", dto);
    return res.data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const res = await api.post("/auth/refresh");
    return res.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },
};
