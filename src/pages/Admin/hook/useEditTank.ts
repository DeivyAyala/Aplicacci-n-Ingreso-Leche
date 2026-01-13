import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editTankAction } from "../actions/edit-tank.action";

export const useEditTank = () => {
  const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: editTankAction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tanks"] });
        }
    });

    return {
        ...mutation,
        editTank: mutation.mutate,
        editTankAsync: mutation.mutateAsync,
    };
}