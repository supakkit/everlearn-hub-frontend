"use client";

import { categoryAPI } from "@/services/categories";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CategoryResponse } from "@/types/api/api-types";
import { LoadingPage } from "@/components/common/LoadingPage";

interface InitialData {
  categories: CategoryResponse[];
}

interface InitialDataContextType extends InitialData {
  onCategoryChange: (categories: CategoryResponse[]) => void;
}

const InitialDataContext = createContext<InitialDataContextType | null>(null);

export function InitialDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<InitialData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categories = await categoryAPI.getCategoryNames();
        setData({ categories });
      } catch (err) {
        console.error("Failed to load initial data", err);
      }
    };

    loadData();
  }, []);

  const onCategoryChange = (categories: CategoryResponse[]) => {
    setData({ categories });
  };

  if (!data) return <LoadingPage />

  return (
    <InitialDataContext.Provider value={{ ...data, onCategoryChange }}>
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
