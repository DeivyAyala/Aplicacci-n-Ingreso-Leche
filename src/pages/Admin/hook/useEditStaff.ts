// hook/useEditStaff.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editStaffAction } from "../actions/edit-staff-action";

export const useEditStaff = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: editStaffAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
  });

  return {
    ...mutation,
    editStaff: mutation.mutate,
    editStaffAsync: mutation.mutateAsync,
  };
};
