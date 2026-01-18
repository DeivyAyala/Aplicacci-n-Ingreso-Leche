import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadUserImageAction } from "../actions/upload-user-image";

export const useUploadUserImage = () => {
     const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: uploadUserImageAction,

        onSuccess: (imageUrl: string) => {
            console.log("Imagen subida correctamente", imageUrl);
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    return {
        ...mutation,
        uploadUserImage: mutation.mutate,
        uploadUserImageAsync: mutation.mutateAsync,
    };
}