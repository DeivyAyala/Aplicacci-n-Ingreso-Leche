import { useQuery } from "@tanstack/react-query"
import { getIngresosActions } from "../actions/get-ingresos-action"

export const useIngreso = () => {
 //TODO: Viene Logica
 

  return useQuery({
    queryKey: ['ingreso'],
    queryFn: getIngresosActions
  })
}
