import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUserAction } from "../actions/edit-user.action";

export const useEditUser = () => {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: editUserAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return {
        ...mutation,
        editUser: mutation.mutate,
        editUserAsync: mutation.mutateAsync,
    };
}