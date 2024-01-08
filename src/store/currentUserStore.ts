import { User } from "@supabase/supabase-js";
import { SetState, GetState, create } from "zustand";

// Define the state type
interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
