import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProviderAction } from "../actions/delete-provider.acttion";

export const useDeleteProvider = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteProviderAction(id),
        
        onSuccess: () => {
            console.log("Proveedor eliminado correctamente");
            queryClient.invalidateQueries({
                queryKey: ["providers"],
            });
        },
    });

    return {
        deleteProviderAsync: mutation.mutateAsync,
        isPending: mutation.isPending,
        error: mutation.error,
    };
};