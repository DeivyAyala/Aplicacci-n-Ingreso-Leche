import type { User } from "@/pages/Registro/Items/Usuarios/types/User"

export interface LoginInterface {
    ok: boolean
    user: User
    token: string
}