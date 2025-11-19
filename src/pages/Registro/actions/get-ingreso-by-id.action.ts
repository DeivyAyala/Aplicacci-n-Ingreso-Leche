import { gestionApi } from "@/api/gestionApi";
import type { PropsRegitros } from "../types/ingresoShema";



export const getIngresoById = async (id: string): Promise<PropsRegitros> => {
    if( !id ) throw new Error('ID es requerido')
      
        
    const { data } = await gestionApi.get(`/ingreso/${id}`);
    return data
}