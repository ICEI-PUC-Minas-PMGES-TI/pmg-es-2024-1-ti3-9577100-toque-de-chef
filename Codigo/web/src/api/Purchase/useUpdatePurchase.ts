import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { PurchaseToUpdateDto } from "../../types/purchase";

type UpdatePurchaseProps = {
  purchase: Partial<PurchaseToUpdateDto>;
};

export const updatePurchase = async ({ purchase }: UpdatePurchaseProps) => {
  const res = await api(`Purchase/editPurchase/${purchase.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchase),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar a compra!");
  }

  return (await res.json()) as PurchaseToUpdateDto;
};

export const useUpdatePurchase = (
  props?: UseMutationOptions<unknown, Error, UpdatePurchaseProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updatePurchase"],
    mutationFn: updatePurchase,
  });
};
