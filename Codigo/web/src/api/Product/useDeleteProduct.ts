import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const deleteProduct = async (id: number) => {
  const res = await api(`Product/deleteProduct/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar produto!");
  }

  if (res.status === 204) {
    return { id };
  }

  return await res.json();
};

export const useDeleteProduct = (
  props?: UseMutationOptions<unknown, Error, number, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
  });
};
