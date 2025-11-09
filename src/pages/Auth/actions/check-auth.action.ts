import { gestionApi } from "@/api/gestionApi";
import type { LoginInterface } from "../types/typeLogin";

export const checkAuthAction = async(): Promise<LoginInterface> => {
    const token = localStorage.getItem('token');
    if(!token) throw new Error('Token no Encontrado')
    
    try {
        const { data } = await gestionApi.get<LoginInterface>('/auth/renew')
        localStorage.setItem('token', data.token)
        return data
    } catch (error) {
        localStorage.removeItem('token')
        throw new Error('Token no Valido')
    }
}