import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { ProductDto } from "../../types/product";

export const createProduct = async (product: ProductDto) => {
  try {
    const response = await api("Product/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Falha ao criar produto");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

export const useCreateProduct = (
  props?: UseMutationOptions<ProductDto, Error, ProductDto, unknown>
) => {
  return useMutation<ProductDto, Error, ProductDto, unknown>({
    ...props,
    mutationKey: ["createProduct"],
    mutationFn: createProduct,
  });
};
