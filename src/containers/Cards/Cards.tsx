import { memo, useContext, useEffect, useMemo, useState } from 'react';
import { Card } from '../../components/Card/Card';
import styles from './Cards.module.css';
import { GetPhotosResult, fetchPhotos, searchPhotos } from '../../API/posts';
import { LoadingSpinner } from '../../components/Animation/LoadingSpinner';
import PopUp from '../../components/PopUp/PopUp';
import CardDetail from '../../components/CardDetail/CardDetail';
import { ThemeContext } from '../../Context/ThemeProvider';

interface CardsProps {
  page: number;
  handleChangePage: (page: number) => void;
  query: string;
}

const Cards: React.FC<CardsProps> = memo(({ page, handleChangePage, query }) => {
  const [cards, setCards] = useState<ICard[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false);
  const isDarkMode = useContext(ThemeContext).currentThemeType === 'dark';

  /**
   * Fetches photos from the API based on the current query and page number.
   * If query is empty, fetches the latest photos.
   * @returns Promise that resolves when the photos have been fetched and updated in state.
   */
  const getCards = async (): Promise<void> => {
    setLoading(true);
    try {
      const result: GetPhotosResult = query !== '' ? await searchPhotos(query, page) : await fetchPhotos(page);

      if (result?.cards) {
        setCards((prev) => {
          if (page === 1) return result.cards;
          if (prev) return [...prev, ...result.cards];
          return result.cards;
        });
      } else {
        setHasReachedEnd(true);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Memoized selected card based on selectedCardId and cards.
   * @returns The selected card or null if it doesn't exist.
   */
  const selectedCard = useMemo(() => {
    if (!cards) return null;
    return cards.find((card) => card.id === selectedCardId);
  }, [selectedCardId, cards]);

  /**
   * Toggles the modal and sets the selected card id.
   * @param id The id of the selected card.
   */
  const toggleModalHandler = (id: string | null) => {
    if (id) setSelectedCardId(id);
    setOpenModal((prev) => !prev);
  };

  /**
   * Fetches cards when the component mounts and when the page or query changes.
   */
  useEffect(() => {
    let isMounted = true;

    if (isMounted && !loading) {
      getCards();
    }

    return () => {
      isMounted = false;
    };
  }, [page, query]);

  /**
   * Implements infinite scroll.
   */
  useEffect(() => {
    function handleScroll() {
      if (hasReachedEnd) return;
      const lastLi = document.querySelector('#cards:last-child');
      if (lastLi) {
        const lastLiOffset = lastLi.scrollTop + lastLi.clientHeight;
        const pageOffset = window.scrollY + window.innerHeight;
        if (pageOffset > lastLiOffset) {
          handleChangePage(page + 1);
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /**
   * Renders the component. Simple Error Message For Now.
   */
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={`${styles.cards_container} ${isDarkMode ? styles.dark : ''}`}>
      {loading && <LoadingSpinner />}
      <PopUp open={openModal} onClose={toggleModalHandler}>
        <CardDetail card={selectedCard} />
      </PopUp>
      <div className={`${styles.cards} ${isDarkMode ? styles.dark : ''}`} id="cards">
        {cards && cards.length > 0 ? (
          cards.map((card) => <Card toggleModalHandler={toggleModalHandler} key={card.id} card={card} />)
        ) : !loading ? (
          <div className={`${styles.no_results} ${isDarkMode ? styles.dark : ''} `}>No results found</div>
        ) : null}
      </div>
    </div>
  );
});

export { Cards };
