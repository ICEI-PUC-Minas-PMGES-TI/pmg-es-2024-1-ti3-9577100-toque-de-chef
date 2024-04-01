import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer } from "../../types/suplyer";

export const createSuplyer = async (suplyer: Partial<Suplyer>) => {
  const formData = new FormData();
  formData.append("name", suplyer.name || "");
  formData.append("description", suplyer.description || "");
  formData.append("phone", suplyer.phone || "");
  formData.append("email", suplyer.email || "");

  await api("Suplyer/createSupyer", {
    method: "POST",
    body: formData,
  });
  // if (!res.ok) {
  //   throw new Error("Erro ao fazer o cadastro!");
  // }

  return suplyer;
};

export const useCreateSuplyer = (
  props?: UseMutationOptions<unknown, Error, Partial<Suplyer>, unknown>
) => {
  return useMutation({
    ...props,
    mutationKey: ["createSuplyer"],
    mutationFn: createSuplyer,
  });
};
