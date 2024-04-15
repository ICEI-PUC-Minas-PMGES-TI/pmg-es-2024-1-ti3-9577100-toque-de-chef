import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Category } from "../../types/category";

export const createCategory = async (category: Partial<Category>) => {
  try {
    const res = await api(`Category/CreateCategory`, {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Erro ao criar categoria");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Erro ao fazer a solicitação:", error);
    throw error;
  }
};

export const useCreateCategory = (
  props?: UseMutationOptions<unknown, Error, Partial<Category>, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createCategory"],
    mutationFn: async (category: Partial<Category>) => {
      try {
        const data = await createCategory(category);
        return data;
      } catch (error) {
        throw new Error("Erro ao fazer a categoria!");
      }
    },
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
    },
  });
};
