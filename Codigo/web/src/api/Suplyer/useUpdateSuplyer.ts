import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer } from "../../types/suplyer";

type UpdateSuplyerProps = {
  suplyer: Partial<Suplyer>;
};

export const updateSuplyer = async ({ suplyer }: UpdateSuplyerProps) => {
  const res = await api(`Suplyer/EditSuplyer/${suplyer.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(suplyer),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o fornecedor!");
  }

  return (await res.json()) as Suplyer;
};

export const useUpdateSuplyer = (
  props?: UseMutationOptions<unknown, Error, UpdateSuplyerProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateSuplyer"],
    mutationFn: updateSuplyer,
  });
};
