import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffAction } from "../actions/delete-staff-action";

export const useDeleteStaff = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteStaffAction(id),

    onSuccess: () => {
      console.log("Personal eliminado correctamente");
      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });

  return {
    deleteStaffAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};


