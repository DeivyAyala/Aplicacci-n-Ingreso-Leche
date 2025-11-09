import { gestionApi } from "@/api/gestionApi"
import type { LoginInterface } from "../types/typeLogin";

export const loginAction = async( email: string,  password: string): Promise<LoginInterface> => {
    try {
        const { data } = await gestionApi.post<LoginInterface>('/auth/login', {
            email: email,
            password: password
        })

        console.log(data)

        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}   