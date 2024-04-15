import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { PurchaseResponse } from "../../types/purchase";

export const readPurchases = async (
  search: string | null,
  page: number = 1,
  take: number = 15
) => {
  const res = await api(
    `Purchase/GetAllPurchases?search=${search || ""}&page=${page}&take=${take}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar produtos");
  }

  const purchaseResponse = (await res.json()) as PurchaseResponse;

  return purchaseResponse;
};

export const useReadPurchases = (
  search: string | null,
  page: number = 1,
  take: number = 15,
  props?: UseQueryOptions<
    PurchaseResponse,
    Error,
    PurchaseResponse,
    [
      string | null,
      {
        search: string | null;
        page: number;
        take: number;
      },
    ]
  >
) => {
  return useQuery({
    ...props,
    queryKey: ["readPurchases", { search, page, take }],
    queryFn: () => readPurchases(search, page, take),
  });
};
