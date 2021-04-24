import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
    'feed/fetchFeed',
    async ([subreddit, searchTerm]) => {

        let slug;
        if (searchTerm) {
            slug = `/search.json?q=${encodeURI(searchTerm)}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`;
        } else {
            slug = '.json';
        }

        const response = await fetch(`https://www.reddit.com/${subreddit}${slug}`);
        const json = await response.json()
        return json.data.children;
    }
);

export const feedSlice = createSlice({
    name: 'feed',
    initialState: {
        subreddit: 'r/pics',
        posts: [],
        searchTerm: '',
        isLoading: false,
        error: false,
    },
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeed.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.posts = action.payload;
            })
            .addCase(fetchFeed.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
                state.posts = [];
            })
    }
});

export const { setSearchTerm, setSubreddit } = feedSlice.actions;

export const getSubreddit = (state) => state.feed.subreddit;
export const getPosts = (state) => state.feed.posts;
export const getSearchTerm = (state) => state.feed.searchTerm;
export const isLoading = (state) => state.feed.isLoading;
export const hasError = (state) => state.feed.error;

export default feedSlice.reducer;