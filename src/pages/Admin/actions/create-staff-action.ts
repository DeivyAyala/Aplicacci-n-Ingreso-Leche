// actions/create-staff-action.ts
import { gestionApi } from "@/api/gestionApi";
import type { StaffProps } from "../Items/staff/types/Staff";


export interface CreateStaffInput {
  name: string;
  email: string;
  phone?: string;
  role: "Supervisor" | "Calidad";
}

export const createStaffAction = async (
  staffLike: CreateStaffInput
): Promise<StaffProps> => {
  const { data } = await gestionApi<{
    ok: boolean;
    personal: StaffProps;
  }>({
    url: "/personal",
    method: "POST",
    data: staffLike,
  });

  return data.personal;
};
