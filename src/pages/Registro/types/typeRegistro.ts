// import type { StaffProps } from "../Items/Personal/types/Staff"
import type { Provider } from "../Items/Proveedor/types/Provider"
import type { User } from "../Items/Usuarios/types/User"

export interface PropsRegitros {
  _id?: string;
  id?: string
  date: string
  time: string
  provider?: Provider
  volume: number
  realVolume: number
  user: User
  notes?: string[]
  supervisor?: string
  analyst?: string
  tank?: string
  customDate?: string
}
