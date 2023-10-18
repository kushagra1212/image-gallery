export type ThemeType = 'light' | 'dark';

export const themes = {
  light: {
    backgroundColor: 'white',
    color: 'black',
  },
  dark: {
    backgroundColor: '#555',
    color: 'white',
  },
  currentThemeType: 'light',
  changeCurrentTheme: (newTheme: ThemeType) => {
    themes.currentThemeType = newTheme;
  },
};
