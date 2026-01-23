import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../actions/get-dashboard.action";
import type { DashboardRange } from "../Items/dashboard/types/Dashboard";
import { useDashboardStore } from "../store/dashboardStore";

interface UseGetDashboardParams {
  range: DashboardRange;
  date?: string;
}

export const useGetDashboard = ({ range, date }: UseGetDashboardParams) => {
  const setDashboard = useDashboardStore((state) => state.setDashboard);

  const query = useQuery({
    queryKey: ["dashboard", range, date],
    queryFn: () => getDashboard({ range, date }),
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
    enabled: Boolean(range),
  });

  useEffect(() => {
    if (query.data) {
      setDashboard(query.data);
    }
  }, [query.data, setDashboard]);

  return query;
};
