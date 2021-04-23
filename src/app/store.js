import { configureStore } from '@reduxjs/toolkit';
import postReducer from  '../features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
