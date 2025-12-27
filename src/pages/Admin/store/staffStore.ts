// store/staffStore.ts
import { create } from "zustand";
import type { StaffProps } from "../Items/staff/types/Staff";


interface StaffState {
  staff: StaffProps[];
  setStaff: (staff: StaffProps[]) => void;
  toggleStaffActive: (id: string) => void;
  updateStaff: (updated: StaffProps) => void;
}

export const useStaffStore = create<StaffState>((set) => ({
  staff: [],
  setStaff: (staff) => set({ staff }),

  toggleStaffActive: (id) =>
    set((state) => ({
      staff: state.staff.map((s) =>
        s._id === id ? { ...s, active: !s.active } : s
      ),
    })),

  updateStaff: (updated) =>
    set((state) => ({
      staff: state.staff.map((s) =>
        s._id === updated._id ? { ...s, ...updated } : s
      ),
    })),
}));
