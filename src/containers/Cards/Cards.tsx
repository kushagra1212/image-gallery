import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Card } from '../../components/Card/Card';
import styles from './Cards.module.css';
import { GetPhotosResult, fetchPhotos, searchPhotos } from '../../API/posts';
import { LoadingSpinner } from '../../components/Animation/LoadingSpinner';
import PopUp from '../../components/PopUp/PopUp';
import CardDetail from '../../components/CardDetail/CardDetail';
import debounce from 'lodash.debounce';
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

  const getCards = async () => {
    setLoading(true);
    try {
      let result: GetPhotosResult;

      if (query !== '') {
        result = await searchPhotos(query, page);
        if (result?.cards) {
          if (result.cards.length === 0) {
            setCards([]);
          } else {
            setCards(result.cards);
          }
        } else {
          setHasReachedEnd(true);
        }
      } else {
        result = await fetchPhotos(page);
        if (result?.cards?.length) {
          setCards((prev) => {
            if (prev) {
              return [...prev, ...result.cards];
            }
            return result.cards;
          });
        } else {
          setHasReachedEnd(true);
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Unknown error occured');
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCard = useMemo(() => {
    if (!cards) return null;
    return cards.find((card) => card.id === selectedCardId);
  }, [selectedCardId, cards]);

  const toggleModalHandler = (id: string | null) => {
    if (id) setSelectedCardId(id);
    setOpenModal((prev) => !prev);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && !loading) {
      getCards();
    }
    return () => {
      isMounted = false;
    };
  }, [page, query]);

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

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {loading && <LoadingSpinner />}
      <PopUp open={openModal} onClose={toggleModalHandler}>
        <CardDetail card={selectedCard} />
      </PopUp>
      <div className={styles.cards} id="cards">
        {cards && cards.length > 0 ? (
          cards.map((card) => <Card toggleModalHandler={toggleModalHandler} key={card.id} card={card} />)
        ) : (
          <h1 className={styles.no_results}>No results found</h1>
        )}
      </div>
    </div>
  );
});
export { Cards };
