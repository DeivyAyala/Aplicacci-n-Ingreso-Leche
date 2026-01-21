import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovement } from "../actions/get-movements.action";
import { useMovementsStore } from "../store/movementsStore";

export const useGetMovements = () => {
  const setMovements = useMovementsStore((state) => state.setMovements);

  const query = useQuery({
    queryKey: ["movimientos"],
    queryFn: getMovement,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (query.data) {
      setMovements(query.data);
    }
  }, [query.data, setMovements]);

  return query;
};
