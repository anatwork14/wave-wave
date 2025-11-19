// store/useUserStore.js

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. Import persist

// Your User type (no changes needed)
export type User = {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  isMap: boolean;
  setIsMap: (isMap: boolean) => void;
};

// 2. Wrap your store creation with persist()
export const useUserStore = create<UserState>()(
  // <-- Note the extra ()
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      isMap: true,
      setIsMap: (isMap) => set({ isMap }),
    }),
    {
      // 3. Configure persistence
      name: "user-auth-storage", // This is the key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
