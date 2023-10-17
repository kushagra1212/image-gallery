import styles from './VerticalNavBar.module.css';

type VerticalNavBarProps = {
  handleShowNavBar: () => void;
};

const VerticalNavBar: React.FC<VerticalNavBarProps> = ({ handleShowNavBar }) => {
  return (
    <div className={styles.verticalNavBarContainer}>
      <div className={styles.verticalNavBarContainerBackDrop} onClick={handleShowNavBar}></div>
      <div className={styles.verticalNavBar}>
        <div className={styles.verticalNavBar_logo}>
          <p className={styles.imageGallery}>Image Gallery</p>
        </div>
        <div className={styles.verticalNavBar_nav}>
          <div className={styles.nav_bar}>
            <h3>Explore </h3>

            <h3>Collection </h3>

            <h3>Comunity </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalNavBar;
