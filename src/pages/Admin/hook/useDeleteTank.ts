import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTankAction } from "../actions/delete-tank.action";

export const useDeleteTank = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteTankAction(id),

        onSuccess: () => {
            console.log("Tanque eliminado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["tanks"],
            });
        }
    });

    return {
        deleteTankAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    };
}