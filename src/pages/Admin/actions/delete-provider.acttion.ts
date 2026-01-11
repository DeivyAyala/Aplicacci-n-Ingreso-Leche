import { gestionApi } from "@/api/gestionApi";

export const deleteProviderAction = async (id: string): Promise<{ message: string }> => {
    if (!id) throw new Error("ID es requerido");  
    
    const { data } = await gestionApi.delete(`/proveedor/${id}`);
    return data; 
};