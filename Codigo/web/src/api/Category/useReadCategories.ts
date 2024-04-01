import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Category, CategoryResponse } from "../../types/category";

export const readCategories = async () => {
  const res = await api(`Category/getAllCategories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar  as categorias");
  }

  const allCategories = (await res.json()) as CategoryResponse;

  return allCategories.obj;
};

export const useReadCategories = (
  props?: UseQueryOptions<unknown, Error, Category[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readCategories"],
    queryFn: readCategories,
  });
};
