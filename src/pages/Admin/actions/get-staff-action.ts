import { gestionApi } from "@/api/gestionApi";
import type { StaffProps } from "../Items/staff/types/Staff";


export const getStaffAction = async (): Promise<StaffProps[]> => {
  const { data } = await gestionApi.get("/personal");
  return data.personal;
};
