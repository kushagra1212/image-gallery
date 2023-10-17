import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBar.module.css';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';

type SearchProps = {
  query: string;
  handleChangeQuery: (query: string) => void;
  handleResetQuery: () => void;
};

export const SearchBar: React.FC<SearchProps> = ({ query, handleChangeQuery, handleResetQuery }) => {
  const debouncedHandleSearchPhotos = useCallback(debounce(handleChangeQuery, 500), []);

  useEffect(() => {
    return () => {
      debouncedHandleSearchPhotos.cancel();
    };
  });

  return (
    <div className={styles.search_bar}>
      <FontAwesomeIcon className={styles.search_icon} icon={faSearch} />
      <input
        className={styles.search_input}
        type="text"
        placeholder="Search high resolution images"
        value={query}
        onChange={(e) => debouncedHandleSearchPhotos(e.target.value)}
      />
      {query && <FontAwesomeIcon icon={faClose} onClick={handleResetQuery} className={styles.reset_query} />}
    </div>
  );
};
