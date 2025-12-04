import fetchApi from "./fetch-api";

export const CourseAPI = {
  getAll: () => fetchApi("/courses"),
  getById: (id: string) => fetchApi(`/courses/${id}`),
};
