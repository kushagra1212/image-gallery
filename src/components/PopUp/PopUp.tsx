import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './PopUp.module.css';
type PopUpProps = {
  children: React.ReactNode;
  title?: string;
  onClose: (id: string | null) => void;
  open: boolean;
};

const PopUp: React.FC<PopUpProps> = ({ children, title, onClose, open }) => {
  if (!open) return null;

  return (
    <div className={styles.popup}>
      <div className={styles.popup_header}>
        <h2>{title}</h2>
        <FontAwesomeIcon icon={faClose} className={styles.close_modal_icon} onClick={() => onClose(null)} />
      </div>
      <div className={styles.popup_content}>{children}</div>
    </div>
  );
};

export default PopUp;
