import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Header.module.css';
import { faArrowLeft, faNavicon, faSearch } from '@fortawesome/free-solid-svg-icons';
import Responsive from '../../components/Responsive/Reponsive';
import { useState } from 'react';
import { getDeviceTypeInfo } from '../../utils/utilResponsive';
import VerticalNavBar from '../VerticalNavBar/VerticalNavBar';

type HeaderProps = {
  children: React.ReactNode;
};

export const Header: React.FC<HeaderProps> = ({ children }) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [showNavBar, setShowNavBar] = useState<boolean>(false);
  const isSmallerDivies =
    getDeviceTypeInfo().deviceType.indexOf('Mobile') !== -1 || getDeviceTypeInfo().deviceType.indexOf('Tablet') !== -1;

  const handleShowNavBar = () => {
    setShowNavBar(!showNavBar);
  };

  if (showNavBar && isSmallerDivies) {
    return <VerticalNavBar handleShowNavBar={handleShowNavBar} />;
  }

  return (
    <header className={styles.header}>
      {showSearch && isSmallerDivies ? (
        <div className={styles.show_search_bar}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            color="black"
            onClick={() => setShowSearch(false)}
            style={{ cursor: 'pointer' }}
          />
          <div className={styles.search_div} style={{ width: '80%' }}>
            {children}
          </div>
        </div>
      ) : (
        <>
          <div className={styles.header_logo}>
            <p className={styles.imageGallery}>Image Gallery</p>
          </div>
          <p className={styles.header_nav}>
            <Responsive displayIn={['Mobile', 'MobilePortrait', 'MobileLandScape']}>
              <FontAwesomeIcon icon={faSearch} color="black" onClick={() => setShowSearch(true)} />
              <FontAwesomeIcon icon={faNavicon} color="black" onClick={() => setShowNavBar(true)} />
            </Responsive>
            <Responsive displayIn={['Tablet', 'Laptop']}>
              <div className={styles.nav_bar}>
                <h3 style={{ marginRight: '1em' }}>Explore </h3>

                <h3 style={{ marginRight: '1em' }}>Collection </h3>

                <h3 style={{ marginRight: '1em' }}>Comunity </h3>
                <div className={styles.search_div}>{children}</div>
              </div>
            </Responsive>
          </p>
        </>
      )}
    </header>
  );
};
