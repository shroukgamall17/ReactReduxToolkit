import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await fetch('https://freetestapi.com/api/v1/books');
  const data = await response.json();
  return data;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action) {
      state.favorites = state.favorites.filter((book) => book.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavorite, removeFavorite } = booksSlice.actions;

export default booksSlice.reducer;
