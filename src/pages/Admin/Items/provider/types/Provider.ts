export interface Provider {
  _id?: string
  id?: string
  name: string
  nit: string
  email: string
  phone?: string
  address: string
  inCharge: string
  active: boolean
  imageUrl?: string | null
  createdAt? : string
  updatedAt?: string
}
