import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";
import { MonthPurchaseResponse } from "../../types/purchase";

export const readMonthPurchase = async () => {
  const res = await api("Purchase/getMonthPurchase", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar os dados de compra do mês");
  }

  const monthPurchase = (await res.json()) as MonthPurchaseResponse;

  return monthPurchase;
};

export const useReadMonthPurchase = (
  props?: UseQueryOptions<
    MonthPurchaseResponse,
    Error,
    MonthPurchaseResponse,
    []
  >
) => {
  return useQuery({
    ...props,
    queryKey: "readMonthPurchase",
    queryFn: () => readMonthPurchase(),
  });
};
