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
    const queryParams = new URLSearchParams({
      name: category.name || "",
      description: category.description || "",
    });

    const res = await api(`Category/addCategory?${queryParams}`, {
      method: "GET",
    });

    // const data = await res.json();
    // console.log("res", data);
    // return data;
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
