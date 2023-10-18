import { fetchWithAuthorization } from './Authorization';

const apiService = {
  fetchPhotos: async (page: number): Promise<{ cards: ICard[] }> => {
    const url = `/photos?page=${page}`;
    const data = await fetchWithAuthorization<ICard[]>(url);
    return {
      cards: data,
    };
  },

  searchPhotos: async (query: string, page: number): Promise<{ cards: ICard[] }> => {
    const url = `/search/photos?page=${page}&query=${query}`;
    const data = await fetchWithAuthorization<{ results: ICard[] }>(url);
    return {
      cards: data.results,
    };
  },
};

export default apiService;
