import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer } from "../../types/suplyer";

type ReadAddressProps = {
  id?: number;
};

export const readSuplyerById = async ({
  id,
}: ReadAddressProps): Promise<Suplyer> => {
  const url = `Suplyer/getSuplyerById?id=${id}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar o fornecedor!");
  }

  return (await res.json()) as Suplyer;
};

export const useReadSuplyerById = (
  id?: number,
  props?: UseQueryOptions<unknown, Error, Suplyer, [string]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readSuplyerById"],
    queryFn: () => readSuplyerById({ id }),
  });
};
