import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Category } from "../../types/category";

type UpdateCategoryProps = {
  category: Partial<Category>;
};

export const updateCategory = async ({ category }: UpdateCategoryProps) => {
  const formData = new FormData();
  formData.append("newName", category.name || "");
  formData.append("newDescription", category.description || "");
  formData.append("id", category.id?.toString() || "");

  const res = await api(`Category/editCategory`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar a categoria!");
  }

  return (await res.json()) as Category;
};

export const useUpdateCategory = (
  props?: UseMutationOptions<unknown, Error, UpdateCategoryProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateCategory"],
    mutationFn: updateCategory,
  });
};
