import { gestionApi } from "@/api/gestionApi";
import type { TankProps } from "../Items/tanks/types/Tank";


export const editTankAction = async ({
    id,
    ...dataToUpdate
}: {
    id: string;
    name?: string;
    capacity?: number;
    active?: boolean;
}) => {
    const { data } = await gestionApi<{
        ok: boolean;
        tanque: TankProps;
    }>({
        url: `/tanque/${id}`,
        method: "PUT",
        data: dataToUpdate,
    });
    
    return data.tanque;
};