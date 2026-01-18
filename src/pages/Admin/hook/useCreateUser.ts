import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsersAction } from "../actions/create-users.action";
import type { User } from "../Items/users/types/User";

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: createUsersAction,

        onSuccess: (data: User) => {
            console.log("Usuario creado correctamente", data);

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    }); 

    return {
        ...mutation,
        createUser: mutation.mutate,
        createUserAsync: mutation.mutateAsync, 
    };
}