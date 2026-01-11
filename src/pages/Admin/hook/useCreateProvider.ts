import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateProviderAction } from "../actions/create-provider-action";
import type { Provider } from "../Items/provider/types/Provider";


export const useCreateProvider = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: CreateProviderAction,
        onSuccess: (data: Provider) => {
            console.log("Proveedor creado correctamente", data);  
            queryClient.invalidateQueries({
                queryKey: ["provider"],
            });
        },
    });
    return {
        ...mutation,
        createProvider: mutation.mutate,
        createProviderAsync: mutation.mutateAsync,
    };
}