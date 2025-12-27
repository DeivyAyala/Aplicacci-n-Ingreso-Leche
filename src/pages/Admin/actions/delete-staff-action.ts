import { gestionApi } from "@/api/gestionApi";

export const deleteStaffAction = async (id: string): Promise<{ message: string }> => {
  if (!id) throw new Error("ID es requerido");

  const { data } = await gestionApi.delete(`/personal/${id}`);
  return data; // <-- el backend probablemente devuelve { message: "eliminado" }
};
