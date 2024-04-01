import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";

export const deleteSuplyer = async (id: number) => {
  const formData = new FormData();
  formData.append("id", id.toString());

  const res = await api(`Suplyer/deleteSuplyer`, {
    method: "DELETE",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao deletar fornecedor!");
  }

  if (res.status === 204) {
    return { id };
  }

  console.log("res", res);

  // return (await res.json()) as Suplyer;
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
