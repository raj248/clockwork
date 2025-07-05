import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDark: boolean;
  toggleTheme: () => void;
  setDark: (dark: boolean) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      setDark: (dark) => set({ isDark: dark }),
    }),
    {
      name: 'theme-store', // persists in AsyncStorage
    }
  )
);
