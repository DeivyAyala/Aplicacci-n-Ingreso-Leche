// import type { StaffProps } from "../Items/Personal/types/Staff"

import type { Provider } from "../Items/provider/types/Provider";
import type { StaffProps } from "../Items/staff/types/Staff";
import type { TankProps } from "../Items/tanks/types/Tank";
import type { User } from "../Items/users/types/User";

export interface PropsRegitros {
  _id?: string;
  id?: string
  date: string
  time: string
  provider?: Partial<Provider>
  volume: number
  realVolume: number
  user: Partial<User>
  notes?: string[] 
  supervisor?: Partial<StaffProps>
  analyst?: Partial<StaffProps>
  tank?: Partial<TankProps>
  customDate?: string
  ingreso?: any
}
