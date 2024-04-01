import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

export const registerUser = async (user: Partial<User>) => {
  const res = await api("Auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user, active: true, type: "1" }),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o cadastro!");
  }

  return await res.json();
};

export const useRegisterUser = (
  props?: UseMutationOptions<unknown, Error, Partial<User>, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["registerUser"],
    mutationFn: registerUser,
    onSuccess: (data, ...rest) => {
      props?.onSuccess?.(data, ...rest);
    },
  });
};
