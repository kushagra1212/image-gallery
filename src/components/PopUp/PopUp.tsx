import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PopUp.module.css';
import { useContext } from 'react';
import { ThemeContext } from '../../Context/ThemeProvider';
type PopUpProps = {
  children: React.ReactNode;
  title?: string;
  onClose: (id: string | null) => void;
  open: boolean;
};

const PopUp: React.FC<PopUpProps> = ({ children, title, onClose, open }) => {
  const isDarkTheme = useContext(ThemeContext).currentThemeType === 'dark';

  if (!open) return null;

  return (
    <div className={styles.popup_container}>
      <div className={`${styles.popup_backdrop} ${isDarkTheme ? styles.dark : ''}`}></div>
      <div className={styles.popup}>
        <div className={styles.popup_header}>
          <h2>{title}</h2>
          <FontAwesomeIcon
            icon={faClose}
            className={`${styles.close_modal_icon} ${isDarkTheme ? styles.dark : ''}`}
            onClick={() => onClose(null)}
          />
        </div>
        <div className={styles.popup_content}>{children}</div>
      </div>
    </div>
  );
};

export default PopUp;
