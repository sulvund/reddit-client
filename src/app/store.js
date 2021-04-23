import { configureStore } from '@reduxjs/toolkit';
import feedReducer from  '../features/feed/feedSlice';
import postReducer from  '../features/post/postSlice';

export const store = configureStore({
  reducer: {
    posts: feedReducer,
    post: postReducer,
  },
});
