import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { User } from "../../types/user";

type UpdateUserTypeProps = {
  user: Pick<User, "id" | "type">;
};

export const updateUserType = async ({ user }: UpdateUserTypeProps) => {
  const res = await api(`User/EditUserAcess/${user.id}/${user.type}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o produto!");
  }

  return (await res.json()) as User;
};

export const useUpdateUserType = (
  props?: UseMutationOptions<unknown, Error, UpdateUserTypeProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateUserType"],
    mutationFn: updateUserType,
  });
};
