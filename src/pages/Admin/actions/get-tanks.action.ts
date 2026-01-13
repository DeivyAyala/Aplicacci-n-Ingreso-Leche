import { gestionApi } from "@/api/gestionApi";
import type { TankProps } from "../Items/tanks/types/Tank";

export const getTanksAction = async (): Promise<TankProps[]> => {
    const { data } = await gestionApi.get("/tanque");
    return data.tanques;
}