import { create } from "zustand";
import type { User } from "../Items/users/types/User";

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
  toggleUserActive: (id: string) => void;
  updateUser: (updated: User) => void;
}

export const useUsersStore = create<UserState>((set) => ({
    users: [],
    setUsers: (users) => set({ users }),

    toggleUserActive: (id) =>
        set((state) => ({
            users: state.users.map((u) =>
                u._id === id ? { ...u, active: !u.active } : u
            ),
        })),
    updateUser: (updated) =>
        set((state) => ({
            users: state.users.map((u) =>
                u._id === updated._id ? { ...u, ...updated } : u
            ),
        })),
}));