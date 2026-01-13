import { gestionApi } from "@/api/gestionApi";

export const deleteTankAction = async (id: string): Promise<{ message: string }> => {
    if (!id) throw new Error("ID es requerido");

    const { data } = await gestionApi.delete(`/tanque/${id}`);
    return data; 
}