import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '../api/newsApi';

const loadFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
};

const saveFavoritesToLocalStorage = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

export const getArticles = createAsyncThunk('articles/getArticles', async ({ category, page }) => {
  const response = await fetchArticles(category, page);
  return response.articles;
});

export const searchArticles = createAsyncThunk('articles/searchArticles', async (query) => {
  const response = await fetchArticles('', 1, query);
  return response.articles;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    favorites: loadFavoritesFromLocalStorage(),
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const article = action.payload;
      const isFavorite = state.favorites.find((a) => a.url === article.url);
      if (isFavorite) {
        state.favorites = state.favorites.filter((a) => a.url !== article.url);
      } else {
        state.favorites.push(article);
      }
      saveFavoritesToLocalStorage(state.favorites);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(searchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite } = articlesSlice.actions;

export default articlesSlice.reducer;
