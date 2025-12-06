import { AllCoursesResponse, CourseResponse, GetCourseParams } from "@/types/api/api-types";
import fetchApi from "./fetch-api";

export const courseAPI = {
  getAll: (params: GetCourseParams): Promise<AllCoursesResponse> => {
    const queryString = new URLSearchParams(params).toString();
    return fetchApi(`/courses?${queryString}`);
  },
  getOne: (courseId: string): Promise<CourseResponse> => fetchApi(`/courses/${courseId}`),
};
