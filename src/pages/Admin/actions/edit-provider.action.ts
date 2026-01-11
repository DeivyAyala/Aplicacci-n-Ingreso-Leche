import { gestionApi } from "@/api/gestionApi";
import type { Provider } from "../Items/provider/types/Provider";



export const editProviderAction = async ({
  id,
  ...dataToUpdate
}: {
    id: string;
    name?: string;
    addres?: string;
    nit?: string;
    email?: string;
    phone?: string;
    inCharge?: string;
    active?: boolean;
    imageUrl?: string | null;
}) => {
  const { data } = await gestionApi<{
    ok: boolean;
    proveedor: Provider;
  }>({
    url: `/proveedor/${id}`,
    method: "PUT",
    data: dataToUpdate,
  });   
  return data.proveedor;
};

