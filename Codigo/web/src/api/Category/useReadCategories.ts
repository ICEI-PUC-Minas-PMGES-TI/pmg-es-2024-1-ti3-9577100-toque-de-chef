import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { CategoryResponse } from "../../types/category";

export const readCategories = async (
  search: string | null,
  page: number = 1,
  take: number = 15
) => {
  const res = await api(
    `Category/getAllCategories?search=${search || ""}&page=${page}&take=${take}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar as categorias");
  }

  const allCategories = (await res.json()) as CategoryResponse;

  return allCategories;
};

export const useReadCategories = (
  search: string | null,
  page: number = 1,
  take: number = 15,
  props?: UseQueryOptions<
    CategoryResponse,
    Error,
    CategoryResponse,
    [
      string | null,
      {
        search: string | null;
        page: number;
        take: number;
      },
    ]
  >
) => {
  return useQuery({
    ...props,
    queryKey: ["readCategories", { search, page, take }],
    queryFn: () => readCategories(search, page, take),
  });
};
