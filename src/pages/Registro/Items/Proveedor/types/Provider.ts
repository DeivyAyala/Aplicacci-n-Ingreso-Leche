export interface Provider {
  id: string
  name: string
  nit: string
  email: string
  phone: string
  inCharge: string
  active: boolean
  imageUrl: string
  createdAt? : string
  updatedAt?: string
}
