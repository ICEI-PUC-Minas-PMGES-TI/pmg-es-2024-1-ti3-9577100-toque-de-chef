import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const deleteSuplyer = async (id: number) => {
  const res = await api(`Suplyer/DeleteSuplyer/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar fornecedor!");
  }

  if (res.status === 204) {
    return { id };
  }

  return await res.json();
};

export const useDeleteSuplyer = (
  props?: UseMutationOptions<unknown, Error, number, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["deleteSuplyer"],
    mutationFn: deleteSuplyer,
  });
};
