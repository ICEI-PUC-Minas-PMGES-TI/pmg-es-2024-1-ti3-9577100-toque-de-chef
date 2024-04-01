import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

export const getCurrentUser = async () => {
  const res = await api("User/getCurrentUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error ao carregar usuário atual!");
  }

  const userDetails = await res.json();

  return userDetails as User;
};

export const useCurrentUser = (
  props?: UseQueryOptions<unknown, Error, User, string[]>
) => {
  return useQuery({
    ...props,
    queryKey: ["getCurrentUser"],
    queryFn: getCurrentUser,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
};
