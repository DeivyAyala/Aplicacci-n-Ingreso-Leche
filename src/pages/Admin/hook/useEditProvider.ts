import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProviderAction } from "../actions/edit-provider.action";

export const useEditProvider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: editProviderAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["provider"] });
        },
    });

    return {
        ...mutation,
        editProvider: mutation.mutate,
        editProviderAsync: mutation.mutateAsync,
    };
}