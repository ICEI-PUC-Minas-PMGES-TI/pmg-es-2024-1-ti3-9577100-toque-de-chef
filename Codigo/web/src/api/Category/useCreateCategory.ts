import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Category } from "../../types/category";

// export const createCategory = async (category: Partial<Category>) => {
//   const formData = new FormData();
//   formData.append("name", category.name || "");
//   formData.append("description", category.description || "");

//   const res = await api("Category/addCategory", {
//     method: "POST",

//     body: formData,
//   });
//   console.log("res", res);
//   // if (!res.ok) {
//   //   throw new Error("Erro ao fazer o cadastro!");
//   // }

//   return category;
// };

export const createCategory = async (category: Partial<Category>) => {
  try {
    const res = await api(`Category/CreateCategory`, {
      method: "POST",
      body: JSON.stringify(category), // Enviar dados da categoria no corpo da solicitação
      headers: {
        "Content-Type": "application/json", // Definir cabeçalho Content-Type para indicar que o corpo da solicitação é JSON
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
