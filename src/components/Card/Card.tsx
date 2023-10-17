import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Card.module.css';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getHumanReadableNumber } from '../../utils/utils-gen';
interface CardProps {
  card: ICard;
  toggleModalHandler: (id: string) => void;
}

export function Card({ card, toggleModalHandler }: CardProps) {
  return (
    <div
      className={styles.card}
      style={{ aspectRatio: card.width / card.height }}
      onClick={() => toggleModalHandler(card.id)}
    >
      <img className={styles.thumbnail} src={card.urls.thumb} alt="Thumbnail" />
      <div className={styles.card_info}>
        <div className={styles.user_info}>
          <img className={styles.user_profile_image} src={card.user.profile_image.small} alt="User Avatar" />
          <div className={styles.user_name}>
            <p className={styles.user_full_name}>{card.user.username}</p>
            <p className={styles.user_username}>@{card.user.name}</p>
          </div>
        </div>
        <div className={styles.likes}>
          <FontAwesomeIcon className={styles.like_icon} icon={faHeart} />
          <p className={styles.likes_count}>{getHumanReadableNumber(card.likes)}</p>
        </div>
      </div>
    </div>
  );
}