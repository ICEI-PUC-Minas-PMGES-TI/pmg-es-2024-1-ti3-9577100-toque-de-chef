import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { SuplyerResponse } from "../../types/suplyer";

export const readSuplyers = async (
  search: string | null,
  page: number = 1,
  take: number = 15
) => {
  const res = await api(
    `Suplyer/GetAllSuplyers?search=${search || ""}&page=${page}&take=${take}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Erro ao carregar fornecedores");
  }

  const allSuplyers = (await res.json()) as SuplyerResponse;

  return allSuplyers;
};

export const useReadSuplyers = (
  search: string | null,
  page: number = 1,
  take: number = 15,
  props?: UseQueryOptions<
    SuplyerResponse,
    Error,
    SuplyerResponse,
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
    queryKey: ["readSuplyers", { search, page, take }],
    queryFn: () => readSuplyers(search, page, take),
  });
};
