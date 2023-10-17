import styles from './LoadingSpinner.module.css';

type LoadingSpinnerProps = {
  loading?: boolean;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <div className={styles.loading_spinner}>
      <div className={styles.loading_spinner_circle}></div>
    </div>
  );
};
