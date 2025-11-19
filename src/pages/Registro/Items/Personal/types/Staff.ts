
export type StaffRole = "Calidad" | "Supervisor";

export interface StaffProps {
    id: string
    name: string
    email: string
    phone?: string
    role: StaffRole
    imageUrl?: string | null
    active: boolean 
    createdAt? : string
    updatedAt?: string

}