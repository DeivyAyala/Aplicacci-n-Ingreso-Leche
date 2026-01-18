import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAction } from "../actions/delete-user.action";


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUserAction(id),

    onSuccess: () => {
      console.log("Usuario eliminado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

  return {
    deleteUserAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};