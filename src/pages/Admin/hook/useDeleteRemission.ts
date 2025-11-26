import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRemissionAction } from "../actions/delete-remission-action";

export const useDeleteRemission = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteRemissionAction,
    onSuccess: () => {
      console.log("Ingreso eliminado correctamente");

      // 🔥 Volver a pedir los ingresos
      queryClient.invalidateQueries({
        queryKey: ['ingresos'],
      });
    },
  });

  return {
    ...mutation,
    deleteRemission: mutation.mutate,
  };
};
