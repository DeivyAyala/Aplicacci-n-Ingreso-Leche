import { gestionApi } from "@/api/gestionApi";
import type { PropsRegitros } from "../types/typeRegistro";



export interface CreateRemissionInput {
  provider: string | undefined;
  volume: number;
  realVolume: number;
  customDate: string;
  supervisor: string | undefined;
  analyst: string | undefined;
  tank: string | undefined;
  notes?: string[];
}

export const createRemissionAction = async (
  remissionLike: CreateRemissionInput
): Promise<PropsRegitros> => {
  
  const { data } = await gestionApi<PropsRegitros>({
    url: "/ingreso/new",
    method: "POST",
    data: {
      ...remissionLike,
      volume: Number(remissionLike.volume ?? 0),
      realVolume: Number(remissionLike.realVolume ?? 0),
    },
  });

  return data;
};
