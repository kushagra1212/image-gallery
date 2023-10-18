const BASE_URL = import.meta.env.VITE_UNSPLASH_API_URL;
const API_KEY = import.meta.env.VITE_UNSPLASH_CLIENT_ID_ACCESS_KEY;

console.log('API_KEY', API_KEY, BASE_URL);

const headers: HeadersInit = {
  Authorization: `Client-ID ${API_KEY}`,
  'Content-Type': 'application/json',
};

export const fetchWithAuthorization = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const requestOptions: RequestInit = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  const fullUrl = `${BASE_URL}${url}`;
  try {
    const response = await fetch(fullUrl, requestOptions);
    if (!response.ok) {
      throw new Error(`API Request Failed: ${response.status} - ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('An error occurred while making the API request. Please try again later.');
  }
};
