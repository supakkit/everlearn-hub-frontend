import {
  AllCoursesResponse,
  AllCoursesWithLessonsResponse,
  CourseResponse,
  CourseWithLessonsResponse,
  GetCourseParams,
  OverviewLessonResponse,
  ReorderLessonsDto,
} from "@/types/api/api-types";
import fetchApi from "./fetch-api";
import api from "./api";

export const courseAPI = {
  getAll: (params: GetCourseParams): Promise<AllCoursesResponse> => {
    const queryString = new URLSearchParams(params).toString();
    return fetchApi(`/courses?${queryString}`);
  },

  getOne: (courseId: string): Promise<CourseWithLessonsResponse> =>
    fetchApi(`/courses/${courseId}`),

  getOneByAdmin: (courseId: string): Promise<CourseWithLessonsResponse> =>
    fetchApi(`/admin/courses/${courseId}`, {
      credentials: "include",
    }),

  getAllCoursesWithLessonsByAdmin: (
    params: GetCourseParams
  ): Promise<AllCoursesWithLessonsResponse> => {
    const queryString = new URLSearchParams(params).toString();
    return fetchApi(`/admin/courses?${queryString}`, {
      credentials: "include",
    });
  },

  createCourse: async (formData: FormData): Promise<CourseResponse> => {
    const res = await api.post("/admin/courses", formData);
    return res.data;
  },

  updateCourse: async (
    courseId: string,
    formData: FormData
  ): Promise<CourseResponse> => {
    const res = await api.patch(`/admin/courses/${courseId}`, formData);
    return res.data;
  },

  deleteCourse: async (courseId: string): Promise<CourseResponse> => {
    const res = await api.delete(`/admin/courses/${courseId}`);
    return res.data;
  },

  reorderLessons: async (
    courseId: string,
    reorderLessonsDto: ReorderLessonsDto
  ): Promise<OverviewLessonResponse[]> => {
    const res = await api.patch(
      `admin/courses/${courseId}/lessons/reorder`,
      reorderLessonsDto
    );
    return res.data;
  },
};
