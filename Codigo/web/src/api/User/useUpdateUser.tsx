import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

type UpdateUserProps = {
  user: Pick<User, "name" | "password">;
};

export const updateUser = async ({ user }: UpdateUserProps) => {
  const res = await api(`User/editUser/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar usuário!");
  }

  return (await res.json()) as User;
};

export const useUpdateUser = (
  props?: UseMutationOptions<unknown, Error, UpdateUserProps, unknown>
) => {
  return useMutation({
    ...props,

    mutationKey: ["updateUser"],
    mutationFn: updateUser,
  });
};
