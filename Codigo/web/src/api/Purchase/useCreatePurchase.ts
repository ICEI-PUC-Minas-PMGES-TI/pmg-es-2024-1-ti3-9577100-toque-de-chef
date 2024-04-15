import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { PurchaseDto } from "../../types/purchase";

export const createPurchase = async (product: PurchaseDto) => {
  try {
    const response = await api("Purchase/CreatePurchase", {
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

export const useCreatePurchase = (
  props?: UseMutationOptions<PurchaseDto, Error, PurchaseDto, unknown>
) => {
  return useMutation<PurchaseDto, Error, PurchaseDto, unknown>({
    ...props,
    mutationKey: ["createPurchase"],
    mutationFn: createPurchase,
  });
};
