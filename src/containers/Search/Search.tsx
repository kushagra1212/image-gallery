import { memo, useContext } from 'react';
import styles from './Search.module.css';
import { ThemeContext } from '../../Context/ThemeProvider';

type SearchProps = {
  children?: React.ReactNode;
};

export const Search: React.FC<SearchProps> = memo(({ children }) => {
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';

  return (
    <div className={styles.search_container}>
      <div className={`${styles.search_backdrop} ${!isDarkMode ? styles.light : ''}`}></div>
      <div className={`${styles.search} ${!isDarkMode ? styles.light : ''}`}>
        <p className={styles.heading}>Download High Quality Images by creators</p>
        <p className={styles.subheading}>over 2.4 million+ stock Images by our talented community</p>
        <div className={styles.search_bar}>{children}</div>
      </div>
    </div>
  );
});
