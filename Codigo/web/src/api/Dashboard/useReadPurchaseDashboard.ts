import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../api";
import { PurchaseDashboardResponse } from "../../types/purchase";

export const readPurchaseDashboard = async (
  startDate: string | null,
  endDate: string | null
) => {
  const res = await api(
    `Purchase/getPurchaseDashboard?startDate=${startDate || ""}&endDate=${endDate || ""}`,
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

export const useReadPurchaseDashboard = (
  startDate: string | null,
  endDate: string | null,
  props?: UseQueryOptions<
    PurchaseDashboardResponse,
    Error,
    PurchaseDashboardResponse,
    [string | null, string | null]
  >
) => {
  return useQuery({
    ...props,
    queryKey: ["readPurchaseDashboard", { startDate, endDate }],
    queryFn: () => readPurchaseDashboard(startDate, endDate),
  });
};
