import api from "./api";


export const lessonAPI = {
  getByCourse: (courseId: string) => api.get(`/lessons/course/${courseId}`),

  createLesson: (formData: FormData) =>
    api.post("/lessons", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
