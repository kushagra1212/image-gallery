const BASE_URL = 'https://api.unsplash.com';
const API_KEY = '8YPjisW8XCCdg1qqPPoXVjib_u2pQzA22cKk1uY_Fcc';

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
