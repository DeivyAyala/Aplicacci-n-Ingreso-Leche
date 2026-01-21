import type { TankProps } from "../../tanks/types/Tank";

export type MovementsType = "PROCESO" | "TRASLADO" | "VENTA";
export type MovementProcesType = "Planta" | "Derivados/Fermentados" | "Planta UHT";

export interface Movement {
  _id?: string;
  type?: MovementsType;
  processType?: MovementProcesType;
  originTank?: TankProps | string;
  destinationTank?: TankProps | string;
  client?: string;
  quantity?: number;
  movementDate?: string;
  user?: string | { _id?: string; name?: string };
  createdAt?: string;
  updatedAt?: string;
}
