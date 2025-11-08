import { gestionApi } from "@/api/gestionApi"
import type { PropsRegitros } from "../types/typeRegistro";




export const getIngresosActions = async() => {
    const token = localStorage.getItem('token')
    console.log('TOKEN ENVIADO:', token) // No se esta enviando el Token
    const { data } = await gestionApi.get<PropsRegitros>('/ingreso', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    console.log(data)
    return data
}