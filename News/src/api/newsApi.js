import axios from 'axios';

const API_KEY = '20c22b991455486eb273cd0c6f7105a8';
const BASE_URL = 'https://newsapi.org/v2';

export const fetchArticles = async (category, page, query = '') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines?country=in`, {
      params: {
        category,
        page,
        q: query,
        apiKey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
