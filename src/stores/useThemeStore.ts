import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      initTheme: () => {
        applyTheme(get().theme);
      },
    }),
    { name: 'fyra-theme' }
  )
);

function applyTheme(theme: string) {
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && systemDark);

  if (isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  const { theme, initTheme } = useThemeStore.getState();
  if (theme === 'system') initTheme();
});
