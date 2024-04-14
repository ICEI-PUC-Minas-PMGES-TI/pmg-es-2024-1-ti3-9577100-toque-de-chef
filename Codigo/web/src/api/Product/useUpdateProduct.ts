import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Product } from "../../types/product";

type UpdateProductProps = {
  product: Partial<Product>;
};

export const updateProduct = async ({ product }: UpdateProductProps) => {
  const res = await api(`Product/editProduct/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o produto!");
  }

  return (await res.json()) as Product;
};

export const useUpdateProduct = (
  props?: UseMutationOptions<unknown, Error, UpdateProductProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateProduct"],
    mutationFn: updateProduct,
  });
};
