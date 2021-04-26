import { configureStore } from '@reduxjs/toolkit';
import feedReducer from '../containers/Feed/feedSlice';
import subredditsReducer from '../containers/Subreddits/subredditsSlice';

export const store = configureStore({
  reducer: {
    feed: feedReducer,
    subreddits: subredditsReducer
  },
});
