// actions/edit-staff-action.ts
import { gestionApi } from "@/api/gestionApi";
import type { StaffProps } from "../Items/staff/types/Staff";

export const editStaffAction = async ({
  id,
  ...dataToUpdate
}: {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: "Supervisor" | "Calidad";
  active?: boolean;
  imageUrl?: string | null;
}) => {
  const { data } = await gestionApi<{
    ok: boolean;
    personal: StaffProps;
  }>({
    url: `/personal/${id}`,
    method: "PUT",
    data: dataToUpdate,
  });

  return data.personal;
};
