import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { getHumanReadableNumber } from '../../utils/utils-gen';
import { ThemeContext } from '../../Context/ThemeProvider';

import styles from './CardDetail.module.css';
import ConditionalComponent from '../ConditionalComponent/ConditionalComponent';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

type CardDetailProps = {
  card: ICard | null | undefined;
};

const CardDetail: React.FC<CardDetailProps> = ({ card }) => {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.currentThemeType === 'dark';

  if (!card) return null;

  const renderSocialLink = (username: string, icon: IconProp, linkText: string, color: string) => (
    <ConditionalComponent show={username}>
      <div className={styles.card_detail_middle_section_social}>
        <div className={styles.card_detail_middle_section_social_icon}>
          <FontAwesomeIcon icon={icon} color={color} />
        </div>
        <a style={{ color }} target="_blank" href={`https://www.${linkText}.com/${username}`}>
          @{username}
        </a>
      </div>
    </ConditionalComponent>
  );

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
          {renderSocialLink(card.user.instagram_username, faInstagram, 'instagram', isDarkTheme ? 'red' : 'red')}
          {renderSocialLink(card.user.twitter_username, faTwitter, 'twitter', isDarkTheme ? 'lightblue' : 'blue')}
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
