import { gestionApi } from "@/api/gestionApi";
import type { User } from "../Items/users/types/User";


export const editUserAction = async({
    id,
    ...dataToUpdate
} : {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    rol: string;
    imageUrl?: string | null;
}) => {
    const { data } = await gestionApi<{
        ok: boolean ;
        usuario: User
    }>({
        url: `/auth/${id}`,
        method: "PUT",
        data: dataToUpdate
    })
    return data.usuario
}