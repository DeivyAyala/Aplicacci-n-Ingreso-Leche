// hook/useCreateStaff.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffAction } from "../actions/create-staff-action";
import type { StaffProps } from "../Items/staff/types/Staff";


export const useCreateStaff = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createStaffAction,

    onSuccess: (data: StaffProps) => {
      console.log("Staff creado correctamente", data);

      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });

  return {
    ...mutation,
    createStaff: mutation.mutate,
    createStaffAsync: mutation.mutateAsync, // útil en flujos con imagen
  };
};
