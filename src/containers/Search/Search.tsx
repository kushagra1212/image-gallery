import { memo } from 'react';
import styles from './Search.module.css';

type SearchProps = {
  children?: React.ReactNode;
};

export const Search: React.FC<SearchProps> = memo(({ children }) => {
  return (
    <div className={styles.search}>
      <p className={styles.heading}>Download High Quality Images by creators</p>
      <p className={styles.subheading}>over 2.4 million+ stock Images by our talented community</p>
      {children}
    </div>
  );
});
