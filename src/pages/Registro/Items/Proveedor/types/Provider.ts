export interface Provider {
  id: string
  name: string
  nit: string
  email: string
  phone: string
  inCharge: string
  active: boolean
  imageUrl: string | null
  createdAt? : string
  updatedAt?: string
}
