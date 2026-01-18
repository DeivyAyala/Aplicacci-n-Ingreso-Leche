import { useQuery } from "@tanstack/react-query";
import { getUsersAction } from "../actions/get-users.action";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsersAction,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });
}