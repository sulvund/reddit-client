import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async (slug) => {
        const response = await fetch(`https://www.reddit.com/r/${slug}.json`);
        const json = await response.json()
        return json[0].data.children[0].data;
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {},
        isLoading: false,
        hasError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.post = action.payload;
            })
            .addCase(fetchPost.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
                state.post = {};
            })
    }
})


export const selectPost = (state) => state.post.post;
export const isLoading = (state) => state.post.isLoading;
export const hasError = (state) => state.post.hasError;

export default postSlice.reducer;