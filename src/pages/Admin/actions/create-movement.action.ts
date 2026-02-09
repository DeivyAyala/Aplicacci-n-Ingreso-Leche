import { gestionApi } from "@/api/gestionApi";
import type {
  Movement,
  MovementProcesType,
  MovementsType,
} from "../Items/milkMovements/types/MilkMovement";

export interface CreateMovementInput {
  type?: MovementsType;
  processType?: MovementProcesType | any;
  originTank?: string;
  destinationTank?: string;
  client?: string;
  quantity?: number;
  movementDate?: string;
  user?: string;
}

type MovimientoResponse = Movement | { movimiento?: Movement };

const extractMovimiento = (data: MovimientoResponse): Movement => {
  if (typeof data === "object" && data !== null && "movimiento" in data) {
    return (data as { movimiento?: Movement }).movimiento ?? (data as Movement);
  }
  return data as Movement;
};

export const createMovement = async (
  movimientoLike: CreateMovementInput
): Promise<Movement> => {
  const { data } = await gestionApi<MovimientoResponse>({
    url: "/movimiento",
    method: "POST",
    data: movimientoLike,
  });

  return extractMovimiento(data);
};
