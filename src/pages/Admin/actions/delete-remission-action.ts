import { gestionApi } from "@/api/gestionApi";


export const deleteRemissionAction = async (id: string | undefined) : Promise<{ message: string }> => {
    if (!id) throw new Error("ID es requerido");
    
    const { data } = await gestionApi.delete(`/ingreso/${id}`);
    return data;
}
