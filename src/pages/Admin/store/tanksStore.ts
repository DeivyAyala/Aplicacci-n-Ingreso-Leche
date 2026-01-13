
import { create } from "zustand";
import type { TankProps } from "../Items/tanks/types/Tank";


interface TankState {
    tanks: TankProps[];
    setTanks: (tanks: TankProps[]) => void;
    toggleTankActive: (id: string) => void;
    updateTank: (updated: TankProps) => void;
}

export const useTanksStore = create<TankState>((set) => ({
    tanks: [],
    setTanks: (tanks) => set({ tanks }),

    toggleTankActive: (id) =>
        set((state) => ({
            tanks: state.tanks.map((t) =>
                t._id === id ? { ...t, active: !t.active } : t
            ),
        })),
        
    updateTank: (updated) =>
        set((state) => ({
            tanks: state.tanks.map((t) =>  
                t._id === updated._id ? { ...t, ...updated } : t
            ),
        })),
}));