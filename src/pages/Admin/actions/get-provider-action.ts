import { gestionApi } from "@/api/gestionApi";
import type { Provider } from "../Items/provider/types/Provider";

export const getProviderAction = async (): Promise<Provider[]> => {
  const { data } = await gestionApi.get("/proveedor");
  return data.proveedor;
};