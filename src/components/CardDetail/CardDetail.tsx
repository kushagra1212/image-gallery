import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './CardDetail.module.css';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import ConditionalComponent from '../ConditionalComponent/ConditionalComponent';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { getHumanReadableNumber } from '../../utils/utils-gen';
import { ThemeContext } from '../../Context/ThemeProvider';
import { useContext } from 'react';
type CardDetailProps = {
  card: ICard | null | undefined;
};

const CardDetail: React.FC<CardDetailProps> = ({ card }) => {
  const isDarkTheme = useContext(ThemeContext).currentThemeType === 'dark';

  if (!card) return null;
  return (
    <div className={`${styles.card_detail} ${isDarkTheme ? styles.dark : ''}`}>
      <div className={styles.card_detail_image} style={{ aspectRatio: card.width / card.height }}>
        <img src={card.urls.regular} alt={card.alt_description} style={{ aspectRatio: card.width / card.height }} />
      </div>
      <div className={styles.card_detail_section}>
        <div className={styles.card_detail_top_section}>
          <div className={styles.card_detail_top_section_profile}>
            <img
              src={card.user.profile_image.small}
              alt={card.user.username}
              className={styles.card_detail_section_image}
            />
            <div className={styles.card_detail_section_text}>
              <h3>{card.user.name}</h3>
              <p>@{card.user.username}</p>
            </div>
          </div>
          <a href={card.links.download} download>
            <button className={`${styles.download_button} ${isDarkTheme ? styles.dark : ''}`}>Download</button>
          </a>
        </div>
        <div className={styles.card_detail_middle_section}>
          <ConditionalComponent show={card.user.instagram_username}>
            <div className={styles.card_detail_middle_section_social}>
              <div className={styles.card_detail_middle_section_social_icon}>
                <FontAwesomeIcon icon={faInstagram} color="red" />
              </div>
              <p>{card.user.instagram_username}</p>
            </div>
          </ConditionalComponent>
          <ConditionalComponent show={card.user.twitter_username}>
            <div className={styles.card_detail_middle_section_social}>
              <div className={styles.card_detail_middle_section_social_icon}>
                <FontAwesomeIcon icon={faTwitter} color="blue" />
              </div>
              <p>{card.user.twitter_username}</p>
            </div>
          </ConditionalComponent>
          <div className={styles.card_detail_middle_section_social}>
            <FontAwesomeIcon
              icon={faHeart}
              color={isDarkTheme ? 'white' : 'black'}
              className={styles.card_detail_middle_section_social_icon}
            />
            <p>{getHumanReadableNumber(card.likes)}</p>
          </div>
        </div>
        <ConditionalComponent show={card.description}>
          <div className={styles.card_detail_bottom_section}>
            <div className={`${styles.card_detail_bottom_section_description} ${isDarkTheme ? styles.dark : ''}`}>
              <h3>Description</h3>
              <p>{card.description}</p>
            </div>
          </div>
        </ConditionalComponent>

        <ConditionalComponent show={card.user.bio}>
          <div className={styles.card_detail_bottom_section}>
            <div className={`${styles.card_detail_bottom_section_description} ${isDarkTheme ? styles.dark : ''}`}>
              <h3>Bio</h3>
              <p>{card.user.bio}</p>
            </div>
          </div>
        </ConditionalComponent>
      </div>
    </div>
  );
};

export default CardDetail;
