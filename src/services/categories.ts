import { CategoryNamesResponse } from "@/types/api/api-types";
import fetchApi from "./fetch-api";

export const categoryAPI = {
  getCategoryNames: (): Promise<CategoryNamesResponse> => fetchApi("/categories"),
};
