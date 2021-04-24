import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
    'posts/fetchFeed',
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
    name: 'posts',
    initialState: {
        subreddit: 'r/popular',
        allPosts: [],
        searchTerm: '',
        isLoading: false,
        hasError: false,
    },
    reducers: {
        updateSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        updateSubreddit: (state, action) => {
            state.subreddit = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeed.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchFeed.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.allPosts = action.payload;
            })
            .addCase(fetchFeed.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.posts = [];
            })
    }
});

export const { updateSearchTerm, updateSubreddit } = feedSlice.actions;

export const selectSubreddit = (state) => state.posts.subreddit;
export const selectAllPosts = (state) => state.posts.allPosts;
export const selectSearchTerm = (state) => state.posts.searchTerm;
export const isLoading = (state) => state.posts.isLoading;
export const hasError = (state) => state.posts.hasError;

export default feedSlice.reducer;