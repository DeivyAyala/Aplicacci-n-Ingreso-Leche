import { create } from "zustand";
import type { Provider } from "../Items/provider/types/Provider";

interface ProviderState {
  providers: Provider[];
  setProviders: (providers: Provider[]) => void;
  toggleProviderActive: (id: string) => void;
  updateProvider: (updated: Provider) => void;
}

export const useProviderStore = create<ProviderState>((set) => ({
  providers: [],
  setProviders: (providers) => set({ providers }),

  toggleProviderActive: (id) =>
    set((state) => ({
        providers: state.providers.map((p) =>
            p._id === id ? { ...p, active: !p.active } : p
        ),
    })),

    updateProvider: (updated) =>
    set((state) => ({
        providers: state.providers.map((p) =>
            p._id === updated._id ? { ...p, ...updated } : p
        ),
    })),
}));