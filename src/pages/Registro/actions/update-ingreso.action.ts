import { gestionApi } from "@/api/gestionApi";
import type { PropsRegitros } from "../types/ingresoShema";

export const updateIngresoAction = async(
    ingresoLike : Partial<PropsRegitros>
): Promise< PropsRegitros > => {

    const { id , user, ...rest} = ingresoLike
    const isCreating = id === 'new'

    rest.volume = Number(rest.volume || 0)
    rest.realVolume = Number(rest.realVolume || 0)


    const { data } = await gestionApi<PropsRegitros>({
        url: isCreating ? '/ingreso/new' : `/ingreso/${id}`,
        method: isCreating ? 'POST' : 'PUT',
        data: rest
    })

    return{
        ...data,
    }


}