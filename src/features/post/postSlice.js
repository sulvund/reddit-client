import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetch('https://www.reddit.com/r/popular.json');
        const json = await response.json()
        return json.data.children;
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        allPosts: [],
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.allPosts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.posts = [];
            })
    }

});

export const selectAllPosts = (state) => state.posts.allPosts;
export const isLoadingPosts = (state) => state.posts.isLoading;

export default postSlice.reducer;