import { useQuery } from "@tanstack/react-query"
import { getIngresosActions, type IngresosResponse } from "../actions/get-ingresos.action"

export const useIngreso = () => {
 //TODO: Viene Logica
  return useQuery<IngresosResponse>({
    queryKey: ['ingresos'],
    refetchOnWindowFocus: true,
    queryFn: getIngresosActions,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  })
}
