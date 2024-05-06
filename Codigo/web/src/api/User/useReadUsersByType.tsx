import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { UserInfoType } from "../../types/user";
import { api } from "../api";

type ReadAddressProps = {
  userType?: number;
};

export const readUsersByType = async ({
  userType,
}: ReadAddressProps): Promise<UserInfoType[]> => {
  const url = `User/GetUsersByType?userType=${userType}`;

  const res = await api(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao carregar o fornecedor!");
  }

  return (await res.json()) as UserInfoType[];
};

export const useReadUsersByType = (
  userType?: number,
  props?: UseQueryOptions<unknown, Error, UserInfoType[], [string]>
) => {
  return useQuery({
    ...props,
    queryKey: ["readUsersByType"],
    queryFn: () => readUsersByType({ userType }),
  });
};
