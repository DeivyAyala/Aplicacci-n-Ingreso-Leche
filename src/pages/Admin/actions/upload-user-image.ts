import { gestionApi } from "@/api/gestionApi";

export interface UploadUserImageInput {
    id: string
    image: File
}

export const uploadUserImageAction = async (
    input: UploadUserImageInput
): Promise<string> => {
    const formData = new FormData();
    formData.append("imagen", input.image);

    const token = localStorage.getItem("token");
    const { data } = await gestionApi<{
        ok: boolean;
        image: string;
    }>({
        url: `/auth/${input.id}/imagen`,
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return data.image;
}