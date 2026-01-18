export type UserRole = "Administrador" | "Operador";

export interface User {
    _id: string
    id: string
    name: string
    lastName: string
    email: string
    password: string
    phone?: string
    rol: UserRole
    imageUrl: string | null
    active?: boolean | undefined
    createdAt? : string
    updatedAt?: string
}