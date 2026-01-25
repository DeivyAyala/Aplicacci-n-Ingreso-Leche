import { gestionApi } from "@/api/gestionApi"
export interface RegisterResponse {
    ok: boolean
    msg: string
}


export const registerAction = async(
    name: string, 
    lastName: string, 
    email: string, 
    password: string): Promise<RegisterResponse> => {

    try {
        const { data } = await gestionApi.post<RegisterResponse>('/auth/new', {
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
