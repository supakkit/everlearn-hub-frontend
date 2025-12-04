import api from "./api";


export const LessonAPI = {
  getByCourse: (courseId: string) => api.get(`/lessons/course/${courseId}`),

  createLesson: (formData: FormData) =>
    api.post("/lessons", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
