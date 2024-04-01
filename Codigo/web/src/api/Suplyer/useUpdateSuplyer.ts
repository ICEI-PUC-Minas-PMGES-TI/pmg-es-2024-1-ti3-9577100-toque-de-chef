import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer } from "../../types/suplyer";

type UpdateSuplyerProps = {
  suplyer: Partial<Suplyer>;
};

export const updateSuplyer = async ({ suplyer }: UpdateSuplyerProps) => {
  const formData = new FormData();
  formData.append("newName", suplyer.name || "");
  formData.append("newDescription", suplyer.description || "");
  formData.append("newPhone", suplyer.phone || "");
  formData.append("id", suplyer.id?.toString() || "");
  formData.append("newEmail", suplyer.email || "");

  const res = await api(`Suplyer/editSuplyer`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Erro ao atualizar o usuário!");
  }

  return (await res.json()) as Suplyer;
};

export const useUpdateSuplyer = (
  props?: UseMutationOptions<unknown, Error, UpdateSuplyerProps, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["updateSuplyer"],
    mutationFn: updateSuplyer,
  });
};
