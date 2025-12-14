"use client";

import { mapCategoryNames } from "@/utils/mapCategoryNames";
import { categoryAPI } from "@/services/categories";
import { CategoryName } from "@/utils/mapCategoryNames"; 
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CategoryNamesResponse } from "@/types/api/api-types";

interface InitialData {
  courseCategoryNames: CategoryName[];
  courseCategories: CategoryNamesResponse;
}

const InitialDataContext = createContext<InitialData | null>(null);

export function InitialDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InitialData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await categoryAPI.getCategoryNames();
        const courseCategories = categories;
        const courseCategoryNames = mapCategoryNames(categories);
        setData({ courseCategoryNames, courseCategories });
      } catch (err) {
        console.error("Failed to load initial data", err);
      }
    };

    loadData();
  }, []);

  if (!data) return null;

  return (
    <InitialDataContext.Provider value={data}>
      {children}
    </InitialDataContext.Provider>
  );
}

export const useInitialData = () => {
  const ctx = useContext(InitialDataContext);
  if (!ctx)
    throw new Error("useInitialData must be inside InitialDataProvider");
  return ctx;
};
