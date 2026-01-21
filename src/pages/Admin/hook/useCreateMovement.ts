import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMovement } from "../actions/create-movement.action";
import type { Movement } from "../Items/milkMovements/types/MilkMovement";

export const useCreateMovimiento = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: (data: Movement) => {
      console.log("Movimiento creado correctamente", data);
      queryClient.invalidateQueries({
        queryKey: ["movimientos"],
      });
    },
  });

  return {
    ...mutation,
    createMovimiento: mutation.mutate,
    createMovimientoAsync: mutation.mutateAsync,
  };
};
