import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { Suplyer } from "../../types/suplyer";

export const createSuplyer = async (suplyer: Partial<Suplyer>) => {
  const res = await api("Suplyer/CreateSuplyer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(suplyer),
  });

  if (!res.ok) {
    throw new Error("Erro ao fazer o cadastro!");
  }

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
