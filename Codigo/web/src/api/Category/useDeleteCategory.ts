import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const deleteCategory = async (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  const res = await api(`Category/deleteCategory`, {
    method: "DELETE",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar  a categoria!");
  }

  if (res.status === 204) {
    return { id };
  }

  // return (await res.json()) as Category;
};

export const useDeleteCategory = (
  props?: UseMutationOptions<unknown, Error, number, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["deleteCategory"],
    mutationFn: deleteCategory,
  });
};
