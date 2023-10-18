import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBar.module.css';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import throttle from 'lodash.throttle';
import { ThemeContext } from '../../Context/ThemeProvider';
type SearchProps = {
  query: string;
  handleChangeQuery: (query: string) => void;
  handleResetQuery: () => void;
};

export const SearchBar: React.FC<SearchProps> = memo(({ query, handleChangeQuery, handleResetQuery }) => {
  const [searchQuery, setSearchQuery] = useState<string>(query);
  const throttleHandleChangeQuery = useCallback(throttle(handleChangeQuery, 520), []);
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';

  useEffect(() => {
    return () => {
      throttleHandleChangeQuery.cancel();
    };
  }, []);

  return (
    <div className={`${styles.search_bar} ${isDarkMode ? styles.dark : ''}`}>
      <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search high resolution images"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          throttleHandleChangeQuery(e.target.value);
        }}
      />
      <FontAwesomeIcon
        icon={faClose}
        onClick={() => {
          handleResetQuery();
          setSearchQuery('');
        }}
        className={`${styles.reset_query} ${isDarkMode ? styles.dark : ''}`}
        style={searchQuery ? { opacity: 1 } : { opacity: 0 }}
      />
    </div>
  );
});
