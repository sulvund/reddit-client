import { configureStore } from '@reduxjs/toolkit';
import feedReducer from  '../containers/Feed/feedSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
  },
});
