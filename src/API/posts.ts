export const BASE_URL = 'http://localhost:8000';

export type GetPhotosResult = {
  cards: ICard[];
};

export type GetPhotsSearchResult = {
  results: ICard[];
  total_pages: number;
  total: number;
};

export const fetchPhotos = async (page: number): Promise<GetPhotosResult> => {
  try {
    const response = await fetch(`${BASE_URL}/photos?page=${page}`);
    const data = (await response.json()) as ICard[];
    return {
      cards: data,
    };
  } catch (error) {
    console.error(error);
    throw new Error('There was an error while trying to get the photos. Please try again later.');
  }
};

export const searchPhotos = async (query: string, page: number): Promise<GetPhotosResult> => {
  try {
    const response = await fetch(`${BASE_URL}/search/photos?page=${page}&query=${query}`);
    const data = (await response.json()) as GetPhotsSearchResult;
    return {
      cards: data.results,
    };
  } catch (error) {
    console.error(error);
    throw new Error('There was an error while trying to get the photos. Please try again later.');
  }
};
