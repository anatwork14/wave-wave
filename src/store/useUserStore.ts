import { create } from "zustand";

export type User = {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "1",
    name: "Khanh An",
    avatar: "/avatars/avatar-1.png",
    email: "anatwork14@gmail.com",
  },
  setUser: (user) => set({ user }),
}));
