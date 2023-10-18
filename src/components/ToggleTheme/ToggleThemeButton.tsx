import React, { memo, useContext } from 'react';
import styles from './ToggleThemeButton.module.css';
import { ThemeContext } from '../../Context/ThemeProvider';

const ToggleThemeButton: React.FC = memo(() => {
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';
  const { changeCurrentTheme } = useContext(ThemeContext);
  const toggleTheme = () => {
    changeCurrentTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className={`${styles.toggle_theme} ${isDarkMode ? styles.dark : ''}`} onClick={toggleTheme}>
      <div
        className={styles.slider}
        style={isDarkMode ? { transform: 'translateX(0)' } : { transform: 'translateX(28px)' }}
      ></div>
    </div>
  );
});

export default ToggleThemeButton;
