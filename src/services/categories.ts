import {
  CategoryResponse,
  CategoryWithCourseCountResponse,
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/types/api/api-types";
import fetchApi from "./fetch-api";
import api from "./api";

export const categoryAPI = {
  getCategoryNames: (): Promise<CategoryResponse[]> => fetchApi("/categories"),

  getCategoriesWithCourseCount: async (): Promise<
    CategoryWithCourseCountResponse[]
  > => {
    const res = await api.get("admin/categories");
    return res.data;
  },

  createCategory: async (
    createCategoryDto: CreateCategoryDto
  ): Promise<CategoryWithCourseCountResponse> => {
    const res = await api.post("admin/categories", createCategoryDto);
    return res.data;
  },

  updateCategory: async (
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<CategoryWithCourseCountResponse> => {
    const res = await api.patch(
      `admin/categories/${categoryId}`,
      updateCategoryDto
    );
    return res.data;
  },

  removeCategory: async (
    categoryId: string
  ): Promise<CategoryWithCourseCountResponse> => {
    const res = await api.delete(`admin/categories/${categoryId}`);
    return res.data;
  },
};
