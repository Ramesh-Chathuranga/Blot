import axios from 'axios';

const API_KEY = 'crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg';
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchMarketNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/news`, {
      params: { category: 'general', token: API_KEY },
    });

    if (response.status === 200) {
      return response.data; // Return news data array
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching market news:', error.message);
    throw error; // Let `useAction` handle it
  }
};
