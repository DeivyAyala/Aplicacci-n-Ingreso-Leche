import { create } from "zustand";
import type { DashboardResponse } from "../Items/dashboard/types/Dashboard";

interface DashboardState {
  dashboard: DashboardResponse | null;
  setDashboard: (dashboard: DashboardResponse) => void;
  clearDashboard: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  dashboard: null,
  setDashboard: (dashboard) => set({ dashboard }),
  clearDashboard: () => set({ dashboard: null }),
}));
