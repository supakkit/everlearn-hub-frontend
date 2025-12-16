import { LessonResponse } from "@/types/api/api-types";
import api from "./api";

export const lessonAPI = {
  getLesson: async (lessonId: string): Promise<LessonResponse> => {
    const res = await api.get(`/lessons/${lessonId}`);
    return res.data;
  },

  getPreviewLesson: async (lessonId: string): Promise<LessonResponse> => {
    const res = await api.get(`/lessons/preview/${lessonId}`);
    return res.data;
  },

  createLesson: async (formData: FormData): Promise<LessonResponse> => {
    const res = await api.post("/admin/lessons", formData);
    return res.data;
  },

  updateLesson: async (
    lessonId: string,
    formData: FormData
  ): Promise<LessonResponse> => {
    const res = await api.patch(`/admin/lessons/${lessonId}`, formData);
    return res.data;
  },

  removeLesson: async (lessonId: string): Promise<LessonResponse> => {
    const res = await api.delete(`/admin/lessons/${lessonId}`);
    return res.data;
  },
};
