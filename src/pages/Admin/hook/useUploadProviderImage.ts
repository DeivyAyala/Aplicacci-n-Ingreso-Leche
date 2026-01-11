import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProviderImageAction } from "../actions/upload-provider-image";

export const useUploadProviderImage = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: uploadProviderImageAction,

        onSuccess: (imageUrl: string) => {
            console.log("Imagen subida correctamente", imageUrl);
            queryClient.invalidateQueries({
                queryKey: ["provider"],
            });
        },
    });

    return {
        ...mutation,
        uploadProviderImage: mutation.mutate,
        uploadProviderImageAsync: mutation.mutateAsync,
    };
}