
import { gestionApi } from "@/api/gestionApi";

export interface UploadStaffImageInput {
  id: string;
  image: File;
}

export const uploadStaffImageAction = async (
  input: UploadStaffImageInput
): Promise<string> => {
  const formData = new FormData();
  formData.append("imagen", input.image);

  const token = localStorage.getItem("token");

  const { data } = await gestionApi<{
    ok: boolean;
    imageUrl: string;
  }>({
    url: `/personal/${input.id}/imagen`,
    method: "POST",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return data.imageUrl;
};
