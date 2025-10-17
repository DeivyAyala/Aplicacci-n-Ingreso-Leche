import { useMemo } from "react"
import { Registros } from "../Registro/Data/Registros"






export const useRegistroById = (id?:string) => {
 const registro = useMemo(() => {
    if (!id) return undefined
    return Registros.find((r) => r.id === id)
  }, [id])

  return { registro }
}
