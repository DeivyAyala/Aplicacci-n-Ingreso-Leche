import { gestionApi } from "@/api/gestionApi";
import type { DashboardRange, DashboardResponse } from "../Items/dashboard/types/Dashboard";

interface GetDashboardParams {
  range: DashboardRange;
  date?: string;
}

export const getDashboard = async ({ range, date }: GetDashboardParams): Promise<DashboardResponse> => {
  const { data } = await gestionApi.get<DashboardResponse>("/dashboard", {
    params: { range, date },
  });

  return data;
};
