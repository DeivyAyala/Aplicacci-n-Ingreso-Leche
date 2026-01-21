import { gestionApi } from "@/api/gestionApi";

export const deleteMovementAction = async (
  id: string
): Promise<{ message?: string }> => {
  if (!id) throw new Error("ID es requerido");

  const { data } = await gestionApi.delete(`/movimiento/${id}`);
  return data;
};
