import { EnrolledCourseResponse } from "@/types/api/api-types";
import api from "./api";

export const enrollmentAPI = {
  getUserEnrollment: async (courseId: string): Promise<EnrolledCourseResponse> => {
    const res = await api.get(`enrollments/courses/${courseId}/me`);
    return res.data;
  },
};