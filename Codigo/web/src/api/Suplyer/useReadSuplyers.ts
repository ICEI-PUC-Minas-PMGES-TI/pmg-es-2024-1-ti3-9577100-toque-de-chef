import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer, SuplyerResponse } from "../../types/suplyer";

export const readSuplyers = async () => {
  const res = await api(`Suplyer/GetAllSuplyers`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar fornecedores");
  }

  const allSuplyers = (await res.json()) as SuplyerResponse;

  return allSuplyers.obj;
};

export const useReadSuplyers = (
  props?: UseQueryOptions<unknown, Error, Suplyer[], string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readSuplyers"],
    queryFn: readSuplyers,
  });
};
