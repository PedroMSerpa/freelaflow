import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const key = 'freelaflow:theme';
export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return localStorage.getItem(key) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, theme);
    } catch {
      /* The selected theme still works for this session. */
    }
  }, [theme]);
  return [theme, setTheme] as const;
}
