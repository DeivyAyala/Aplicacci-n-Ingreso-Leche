import { gestionApi } from "@/api/gestionApi";
import type { User } from "../Items/users/types/User";

export interface CreateUsersInput {
    name: string,
    lastName: string,
    email: string,
    phone: string,
    rol: "Administrador" | "Operador",
    password: string,
    imageUrl?: string
}

export const createUsersAction = async (
    userLike: CreateUsersInput
): Promise<User> => {
    const { data} = await gestionApi<{
        ok: boolean;
        user: User;
    }>({
        url: "/auth/register",
        method: "POST",
        data: userLike,
    });
    return data.user;
}

