import { createContext, useState } from 'react';
import { ThemeType, themes } from './themes';

export const ThemeContext = createContext(themes);

const getThemeFromLocalStorage = (): ThemeType => {
  let localStorageTheme: ThemeType = 'dark';
  if (localStorage.getItem('theme')) localStorageTheme = localStorage.getItem('theme') as ThemeType;
  return localStorageTheme;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(getThemeFromLocalStorage());
  const changeCurrentTheme = (theme: ThemeType) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ ...themes, currentThemeType: theme, changeCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
