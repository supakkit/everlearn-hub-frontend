import {
  CheckoutSessionResponse,
  FreeCourseCheckoutResponse,
  RedirectCheckoutResponse,
} from "@/types/api/api-types";
import api from "./api";

export const paymentAPI = {
  buyCourse: async (courseId: string): Promise<RedirectCheckoutResponse> => {
    const res = await api.post(`/payments/checkout`, { courseId });
    return res.data;
  },

  getCheckoutSession: async (
    sessionId: string
  ): Promise<CheckoutSessionResponse> => {
    const res = await api.get(`/payments/checkout-session/${sessionId}`);
    return res.data;
  },

  enrollFreeCourse: async (
    courseId: string
  ): Promise<FreeCourseCheckoutResponse> => {
    const res = await api.post("/payments/free-enroll", { courseId });
    return res.data;
  },
};
