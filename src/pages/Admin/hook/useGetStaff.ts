import { useQuery } from "@tanstack/react-query";
import { getStaffAction } from "../actions/get-staff-action";

export const useGetStaff = () => {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getStaffAction,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });
};
