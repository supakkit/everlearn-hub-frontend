import { CourseProgressResponse, ProgressResponse } from "@/types/api/api-types";
import api from "./api";

export const progressAPI = {
  getLessonProgress: async (lessonId: string): Promise<ProgressResponse> => {
    const res = await api.get(`/progress/lessons/${lessonId}/me`);
    return res.data;
  },

  getCourseProgress: async (courseId: string): Promise<CourseProgressResponse> => {
    const res = await api.get(`/progress/courses/${courseId}/me`);
    return res.data;
  },

  markLessonComplete: async (lessonId: string): Promise<ProgressResponse> => {
    const res = await api.post(`/progress/lessons/${lessonId}/me`);
    return res.data;
  },

  markLessonIncomplete: async (lessonId: string): Promise<ProgressResponse> => {
    const res = await api.delete(`/progress/lessons/${lessonId}/me`);
    return res.data;
  },
};
