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
};
