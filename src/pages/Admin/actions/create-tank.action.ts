import { gestionApi } from "@/api/gestionApi";
import type { TankProps } from "../Items/tanks/types/Tank";

interface TankData {
  name: string;
  capacity: number;
  active: boolean;
}

export const CreateTankAction = async (
    tankData: TankData
): Promise<TankProps> => {
    const { data } = await gestionApi<{
      ok: boolean;
      tanque: TankProps;
    }>({
      url: "/tanque",
      method: "POST",
      data: tankData,
    }); 
    return data.tanque;
}    