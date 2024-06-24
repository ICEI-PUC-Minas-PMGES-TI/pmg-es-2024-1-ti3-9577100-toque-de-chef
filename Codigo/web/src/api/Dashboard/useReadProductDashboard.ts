import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { ProductDashboardResponse } from "../../types/product";

export const readProductDashboard = async (
  startDate: string | null,
  endDate: string | null,
  page: number = 1,
  take: number = 15
) => {
  const res = await api(
    `Product/getProductDashboard?startDate=${startDate || ""}&endDate=${endDate || ""}&page=${page}&take=${take}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar o dashboard de produtos");
  }

  const productDashboard = (await res.json()) as ProductDashboardResponse;

  return productDashboard;
};

export const useReadProductDashboard = (
  startDate: string | null,
  endDate: string | null,
  page: number = 1,
  take: number = 15,
  props?: UseQueryOptions<
    ProductDashboardResponse,
    Error,
    ProductDashboardResponse,
    [
      string | null,
      {
        startDate: string | null;
        endDate: string | null;
        page: number;
        take: number;
      },
    ]
  >
) => {
  return useQuery({
    ...props,
    queryKey: ["readProductDashboard", { startDate, endDate, page, take }],
    queryFn: () => readProductDashboard(startDate, endDate, page, take),
  });
};
