import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMovementAction } from "../actions/delete-movement.action";

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteMovementAction(id),
    onSuccess: () => {
      console.log("Movimiento eliminado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["movimientos"],
      });
    },
  });

  return {
    deleteMovementAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};
