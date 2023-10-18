import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import { faArrowLeft, faNavicon, faSearch } from '@fortawesome/free-solid-svg-icons';
import Responsive from '../../components/Responsive/Reponsive';
import { memo, useContext, useState } from 'react';
import { getDeviceTypeInfo } from '../../utils/utilResponsive';
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';
import { ThemeContext } from '../../Context/ThemeProvider';
import ToggleThemeButton from '../../components/ToggleTheme/ToggleThemeButton';

type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = memo(({ children }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);

  // Get the current theme type from the ThemeContext
  const isDarkTheme = useContext(ThemeContext).currentThemeType === 'dark';

  // Determine if the device is a mobile or tablet device
  const isSmallerDivies =
    getDeviceTypeInfo().deviceType.indexOf('Mobile') !== -1 || getDeviceTypeInfo().deviceType.indexOf('Tablet') !== -1;

  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  // If the vertical navigation bar should be shown, render it
  if (showNavBar && isSmallerDivies) {
    return <VerticalNavBar handleShowNavBar={handleShowNavBar} />;
  }

  return (
    <header className={`${styles.header} ${isDarkTheme ? styles.dark : ''}`}>
      {/* If the search bar should be shown, render it */}
      {showSearch && isSmallerDivies ? (
        <div className={styles.show_search_bar}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color={isDarkTheme ? 'white' : 'black'}
            onClick={() => setShowSearch(false)}
            style={{ cursor: 'pointer' }}
          />
          <div className={styles.search_div} style={{ width: '90%' }}>
            {children}
          </div>
        </div>
      ) : (
        // Otherwise, render the header logo and navigation
        <>
          <div className={styles.header_logo}>
            <p className={`${styles.imageGallery} ${isDarkTheme ? styles.dark : ''}`}>Image Gallery</p>
          </div>
          <div className={styles.header_nav}>
            {/* Render the search and navigation icons for mobile devices */}
            <Responsive displayIn={['Mobile', 'MobilePortrait', 'MobileLandScape']}>
              <FontAwesomeIcon
                icon={faSearch}
                color={isDarkTheme ? 'white' : 'black'}
                className={styles.search_icon_phone}
                onClick={() => setShowSearch(true)}
              />
              <FontAwesomeIcon
                icon={faNavicon}
                color={isDarkTheme ? 'white' : 'black'}
                onClick={() => setShowNavBar(true)}
              />
            </Responsive>
            {/* Render the navigation bar for tablet and laptop devices */}
            <Responsive displayIn={['Tablet', 'Laptop']}>
              <div className={styles.nav_bar}>
                <h3>Explore </h3>

                <h3>Collection </h3>

                <h3>Comunity </h3>
                <div>
                  <ToggleThemeButton />
                </div>
                <div style={{ width: '40%' }}> {children}</div>
              </div>
            </Responsive>
          </div>
        </>
      )}
    </header>
  );
});
