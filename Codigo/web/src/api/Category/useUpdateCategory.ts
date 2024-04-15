import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Category } from "../../types/category";

type UpdateCategoryProps = {
  category: Partial<Category>;
};

export const updateCategory = async ({ category }: UpdateCategoryProps) => {
  const res = await api(`Category/editCategory/${category.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar a categoria!");
  }

  return (await res.json()) as Category;
};

export const useUpdateCategory = (
  props?: UseMutationOptions<Category, Error, UpdateCategoryProps, unknown>
) => {
  return useMutation<Category, Error, UpdateCategoryProps, unknown>({
    ...props,
    mutationKey: ["updateCategory"],
    mutationFn: updateCategory,
  });
};
