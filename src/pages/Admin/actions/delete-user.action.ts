import { gestionApi } from "@/api/gestionApi";

export const deleteUserAction = async (id: string): Promise<{ message: string }> => {
  if (!id) throw new Error("ID es requerido");

  const { data } = await gestionApi.delete(`/auth/admin/${id}`);
  return data; 
};