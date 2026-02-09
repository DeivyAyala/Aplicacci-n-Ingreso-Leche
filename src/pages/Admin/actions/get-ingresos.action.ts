import { gestionApi } from "@/api/gestionApi"
import type { PropsRegitros } from "../types/typeRegistro";

export interface IngresosResponse {
  ok: boolean;
  ingresos: PropsRegitros[];
}

export const getIngresosActions = async (): Promise<IngresosResponse> => {
  const token = localStorage.getItem("token");
  console.log("TOKEN ENVIADO:", token); // No se esta enviando el Token
  const { data } = await gestionApi.get<IngresosResponse>("/ingreso", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(data);
  return data;
};
