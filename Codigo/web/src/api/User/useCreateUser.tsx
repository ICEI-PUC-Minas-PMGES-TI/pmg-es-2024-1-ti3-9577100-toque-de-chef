import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

export const createUser = async (user: Partial<User>) => {
  const res = await api("User/createUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user }),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o cadastro!");
  }

  return await res.json();
};

export const useCreateUser = (
  props?: UseMutationOptions<unknown, Error, Partial<User>, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createUser"],
    mutationFn: createUser,
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
    },
  });
};
