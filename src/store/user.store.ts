import { create } from 'zustand';

interface UserStoreState {
  currentUsername: string;
  setUsername: (username: string) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  currentUsername: 'bleiwis',
  setUsername: (username: string) => set({ currentUsername: username }),
}));
