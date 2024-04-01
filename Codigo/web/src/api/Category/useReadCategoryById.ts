import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Category } from "../../types/category";

type ReadAddressProps = {
  id?: number;
};

export const readCategoryById = async ({
  id,
}: ReadAddressProps): Promise<Category> => {
  const url = `Category/getCategoryById?id${id}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar a categoria!");
  }

  return (await res.json()) as Category;
};

export const useReadCategoryById = (
  id?: number,
  props?: UseQueryOptions<unknown, Error, Category, [string]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readCategoryById"],
    queryFn: () => readCategoryById({ id }),
  });
};
