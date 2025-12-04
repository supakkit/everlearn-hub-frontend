import { ApiError } from "@/errors/api-error";
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
  headers: AxiosRequestHeaders;
}

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    // No response -> network error
    if (!error.response) {
      return Promise.reject(new ApiError("Network error, please try again."));
    }

    const status = error.response.status;
    const data = error.response.data;

    // If refresh call fails → do NOT retry again
    if (originalRequest.url?.includes("/auth/refresh")) {
      return Promise.reject(
        new ApiError("Session expired. Please login again.", 401)
      );
    }

    // If token expired -> try refresh
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        console.error(err);
        return Promise.reject(
          new ApiError("Session expired. Please login again.", 401)
        );
      }
    }

    let message = data?.message || "Something went wrong";

    if (status === 403) message = "Forbidden. You don't have access.";
    if (status >= 500) message = "Server error. Please try later.";

    return Promise.reject(new ApiError(message, status, data));
  }
);

export default api;
