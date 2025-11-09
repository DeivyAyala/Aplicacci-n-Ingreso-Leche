import { gestionApi } from "@/api/gestionApi"
import type { LoginInterface } from "../types/typeLogin"


export const registerAction = async(
    name: string, 
    lastName: string, 
    email: string, 
    password: string ): Promise<LoginInterface> => {

    try {
        const { data } = await gestionApi.post('/auth/new', {
            name: name,
            lastName: lastName,
            email: email,
            password: password
        })
        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}