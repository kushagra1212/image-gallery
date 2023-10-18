import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';
import ToggleThemeButton from '../../components/ToggleTheme/ToggleThemeButton';
import styles from './VerticalNavBar.module.css';

type VerticalNavBarProps = {
  handleShowNavBar: () => void;
};

const VerticalNavBar: React.FC<VerticalNavBarProps> = ({ handleShowNavBar }) => {
  const currentThemeType = useContext(ThemeContext).currentThemeType;
  const isDarkMode = currentThemeType === 'dark';
  return (
    <div className={`${styles.verticalNavBarContainer} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.verticalNavBarContainerBackDrop} onClick={handleShowNavBar}></div>
      <div className={`${styles.verticalNavBar} ${isDarkMode ? styles.dark : ''}`}>
        <div className={`${styles.verticalNavBar_logo} ${isDarkMode ? styles.darkLogo : ''}`}>
          <p className={`${styles.imageGallery} ${isDarkMode ? styles.darkimg : ''}`}>Image Gallery</p>
        </div>
        <div className={`${styles.verticalNavBar_nav} ${isDarkMode ? styles.dark : ''}`}>
          <div className={styles.nav_bar}>
            <div className={styles.nav_bar_theme}>
              {currentThemeType} <ToggleThemeButton />
            </div>
            <div className={styles.nav_bar_theme}>Explore</div>
            <div className={styles.nav_bar_theme}>Collection</div>
            <div className={styles.nav_bar_theme}>Comunity</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalNavBar;
