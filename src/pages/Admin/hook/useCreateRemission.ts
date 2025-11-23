import { useMutation } from "@tanstack/react-query";
import { createRemissionAction } from "../actions/create-remission-action";
import type { PropsRegitros } from "../types/typeRegistro";

export const useCreateRemission = () => {
  const mutation = useMutation({
    mutationFn: createRemissionAction,
    onSuccess: (data: PropsRegitros) => {
      console.log("Remisión creada correctamente", data);
    },
  });

  return {
    ...mutation,
    createRemission: mutation.mutate,
  };
};
