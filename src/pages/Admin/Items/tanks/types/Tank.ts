export interface TankProps {
    _id?: string
    id: string
    name: string
    active: boolean
    capacity: number
    currentCapacity: number
    createdAt? : string
    updatedAt?: string
}