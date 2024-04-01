import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

type LoginUser = {
  email: string;
  password: string;
};

export const loginUser = async ({ email, password }: LoginUser) => {
  const res = await api("Auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password }),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o login!");
  }

  const userDetails = await res.json();

  return userDetails;
};

export const useLoginUser = (
  props?: UseMutationOptions<
    {
      token: string;
      user: User;
    },
    Error,
    LoginUser,
    LoginUser
  >
) => {
  return useMutation({
    ...props,
    mutationKey: ["loginUser"],
    mutationFn: loginUser,
  });
};
