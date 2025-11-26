import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRemissionAction } from "../actions/create-remission-action";
import type { PropsRegitros } from "../types/typeRegistro";

export const useCreateRemission = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createRemissionAction,

    onSuccess: (data: PropsRegitros) => {
      console.log("Remisión creada correctamente", data);

      queryClient.invalidateQueries({
        queryKey: ["ingresos"],
      });
    },
  });

  return {
    ...mutation,
    createRemission: mutation.mutate,
  };
};
