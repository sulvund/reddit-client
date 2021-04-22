import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (searchTerm) => {

        let slug;
        if (searchTerm) {
            slug = `/search.json?q=${encodeURI(searchTerm)}&restrict_sr=on&include_over_18=on&sort=relevance&t=all`;
        } else {
            slug = '.json';
        }

        const response = await fetch(`https://www.reddit.com/r/popular${slug}`);
        const json = await response.json()
        return json.data.children;
    }
);

export const postSlice = createSlice({
    name: 'posts',
    initialState: {
        allPosts: [],
        searchTerm: '',
        isLoading: false,
        hasError: false,
    },
    reducers: {
        updateSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        }
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

export const { updateSearchTerm } = postSlice.actions;

export const selectSearchTerm = (state) => state.posts.searchTerm;
export const selectAllPosts = (state) => state.posts.allPosts;
export const isLoadingPosts = (state) => state.posts.isLoading;

export default postSlice.reducer;