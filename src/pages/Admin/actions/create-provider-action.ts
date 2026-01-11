import { gestionApi } from "@/api/gestionApi";
import type { Provider } from "../Items/provider/types/Provider";

export interface ProviderData {
  name: string;
  email: string;
  nit: number,
  phone?: string;
  active: boolean;
  address?: string;
  inCharge?: string;
}

export const CreateProviderAction = async (
  providerData: ProviderData
): Promise<Provider> => {
    const { data } = await gestionApi<{
      ok: boolean;
      proveedor: Provider;
    }>({
      url: "/proveedor",
      method: "POST",
      data: providerData,
    }); 
    return data.proveedor;
}
