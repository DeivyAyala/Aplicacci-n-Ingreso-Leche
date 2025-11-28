// hook/useUploadStaffImage.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadStaffImageAction } from "../actions/upload-staff-image";

export const useUploadStaffImage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadStaffImageAction,

    onSuccess: (imageUrl: string) => {
      console.log("Imagen subida correctamente", imageUrl);

      queryClient.invalidateQueries({
        queryKey: ["staff"],
      });
    },
  });

  return {
    ...mutation,
    uploadStaffImage: mutation.mutate,
    uploadStaffImageAsync: mutation.mutateAsync,
  };
};

