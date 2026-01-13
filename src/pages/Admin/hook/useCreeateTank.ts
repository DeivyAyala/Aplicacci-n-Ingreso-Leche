import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateTankAction } from "../actions/create-tank.action";
import type { TankProps } from "../Items/tanks/types/Tank";

export const useCreateTank = () => {
    const queryClient = useQueryClient();  

    const mutation = useMutation({
        mutationFn: CreateTankAction,
        onSuccess: (data: TankProps) => {
            console.log("Tanque creado correctamente", data);  
            queryClient.invalidateQueries({
                queryKey: ["tanks"],
            });
        }
    });
    return {
        ...mutation,
        createTank: mutation.mutate,
        createTankAsync: mutation.mutateAsync,
    };
}