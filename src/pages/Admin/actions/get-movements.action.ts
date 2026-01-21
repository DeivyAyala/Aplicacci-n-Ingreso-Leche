import { gestionApi } from "@/api/gestionApi";
import type { Movement } from "../Items/milkMovements/types/MilkMovement";

type MovimientosResponse = Movement[] | { movimientos?: Movement[] };

const extractMovimientos = (data: MovimientosResponse): Movement[] => {
  if (Array.isArray(data)) {
    return data;
  }
  return data.movimientos ?? [];
};

export const getMovement = async (): Promise<Movement[]> => {
  const { data } = await gestionApi<MovimientosResponse>("/movimiento");
  return extractMovimientos(data);
};
