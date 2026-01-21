import { create } from "zustand";
import type { Movement } from "../Items/milkMovements/types/MilkMovement";

interface MovementState {
  movements: Movement[];
  setMovements: (movements: Movement[]) => void;
}

export const useMovementsStore = create<MovementState>((set) => ({
  movements: [],
  setMovements: (movements) => set({ movements }),
}));
