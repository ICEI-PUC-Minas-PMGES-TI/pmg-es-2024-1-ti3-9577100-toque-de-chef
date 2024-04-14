import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { ProductResponse } from "../../types/product";

export const readProducts = async (
  search: string | null,
  page: number = 1,
  take: number = 15
) => {
  const res = await api(
    `Product/getAllProducts?search=${search || ""}&page=${page}&take=${take}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar produtos");
  }

  const productResponse = (await res.json()) as ProductResponse;

  console.log("productResponse", productResponse);

  return productResponse;
};

export const useReadProducts = (
  search: string | null,
  page: number = 1,
  take: number = 15,
  props?: UseQueryOptions<
    ProductResponse,
    Error,
    ProductResponse,
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
    queryKey: ["readProducts", { search, page, take }],
    queryFn: () => readProducts(search, page, take),
  });
};
