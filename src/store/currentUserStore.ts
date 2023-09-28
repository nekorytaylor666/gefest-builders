import { create } from "zustand";

type UserState = {
  currentUser: null | {
    email: string;
    fullName: string;
    phoneNumber: string;
    picture?: string;
    metadata?: string;
    externalUserId?: string;
  };
  setCurrentUser: (currentUser: UserState["currentUser"]) => void;
};

export const useCurrentUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),
}));
