import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'auto';
type ColorTheme = 'default' | 'ocean' | 'purple' | 'forest' | 'sunset' | 'rose' | 'midnight';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
  const [colorTheme, setColorThemeState] = useState<ColorTheme>('default');

  useEffect(() => {
    const stored = localStorage.getItem('yanlik_theme') as Theme;
    const storedColor = localStorage.getItem('yanlik_color_theme') as ColorTheme;
    if (stored) setThemeState(stored);
    if (storedColor) setColorThemeState(storedColor);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'auto') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
      setActualTheme(isDark ? 'dark' : 'light');
    } else {
      root.classList.toggle('dark', theme === 'dark');
      setActualTheme(theme);
    }

    localStorage.setItem('yanlik_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    const themes: ColorTheme[] = ['default', 'ocean', 'purple', 'forest', 'sunset', 'rose', 'midnight'];
    
    themes.forEach(t => {
      if (t !== 'default') {
        root.classList.remove(`theme-${t}`);
      }
    });

    if (colorTheme !== 'default') {
      root.classList.add(`theme-${colorTheme}`);
    }

    localStorage.setItem('yanlik_color_theme', colorTheme);
  }, [colorTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState, actualTheme, colorTheme, setColorTheme: setColorThemeState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
