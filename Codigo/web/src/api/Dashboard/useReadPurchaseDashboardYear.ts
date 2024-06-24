import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";
import { PurchaseDashboardResponse } from "../../types/purchase";

export const readPurchaseDashboardYear = async () => {
  const year = new Date().getFullYear();
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const res = await api(
    `Purchase/getPurchaseDashboard?startDate=${startDate}&endDate=${endDate}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar o dashboard de compras");
  }

  const purchaseDashboard = (await res.json()) as PurchaseDashboardResponse;

  return purchaseDashboard;
};

export const useReadPurchaseDashboardYear = (
  props?: UseQueryOptions<
    PurchaseDashboardResponse,
    Error,
    PurchaseDashboardResponse,
    []
  >
) => {
  return useQuery({
    ...props,
    queryKey: ["readPurchaseDashboardYear"],
    queryFn: () => readPurchaseDashboardYear(),
  });
};
