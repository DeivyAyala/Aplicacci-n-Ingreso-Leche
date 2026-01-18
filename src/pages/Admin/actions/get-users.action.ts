import { gestionApi } from "@/api/gestionApi";
import type { User } from "../Items/users/types/User";


export const getUsersAction = async (): Promise<User[]> => {
    const { data } = await gestionApi.get("/auth/usuarios");
    return data.usuarios;
}