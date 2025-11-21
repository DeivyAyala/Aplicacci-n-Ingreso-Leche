
import { getIngresoById } from "@/pages/Registro/actions/get-ingreso-by-id.action"
import { updateIngresoAction } from "@/pages/Registro/actions/update-ingreso.action"
import type { PropsRegitros } from "@/pages/Registro/types/typeRegistro"
import { useMutation, useQuery } from "@tanstack/react-query"





export const useIngreso = (id: string) => {

   const query = useQuery({
    queryKey: ['ingreso', { id }],
    queryFn: () => getIngresoById(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos 
    enabled: !!id,
    refetchOnMount: 'always',
   })

   //TODO mutacion 
   const mutation = useMutation({
    mutationFn: updateIngresoAction,
    onSuccess : ( ingreso: PropsRegitros) => {
      console.log('Todo Salio Bien', ingreso)
    }
   })

   


  return {
    ...query,
    mutation 
  }
}
