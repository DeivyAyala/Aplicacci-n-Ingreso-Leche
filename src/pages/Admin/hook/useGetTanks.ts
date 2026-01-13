import { useQuery } from "@tanstack/react-query";
import { getTanksAction } from "../actions/get-tanks.action";

export const useGetTanks = () => {
    return useQuery({
        queryKey: ["tanks"],
        queryFn: getTanksAction,
        refetchOnWindowFocus: true,
        refetchOnMount: "always",
        refetchOnReconnect: true,
    });
}