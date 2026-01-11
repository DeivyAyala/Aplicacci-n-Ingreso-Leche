import { useQuery } from "@tanstack/react-query";
import { getProviderAction } from "../actions/get-provider-action";

export const useGetProvider = () => {
  return useQuery({
    queryKey: ["provider"],
    queryFn: getProviderAction,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });
};