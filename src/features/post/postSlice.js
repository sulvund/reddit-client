import { createAsyncThunk, createSlice } from 'react-redux';

export const fetchPost = createAsyncThunk(
    'post/fetchPost',
    async () => {
        const response = await fetch(`https://www.reddit.com/r/popular${slug}`);
        const json = await response.json()
        return json.data.children;
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: undefined,
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
                state.post = undefined;
            })
    }
})