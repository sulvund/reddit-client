import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import { getSubreddits } from '../../api/reddit';

export const fetchSubreddits = createAsyncThunk(
    'subreddits/fetchSubreddits',
    async () => {
        const response = await fetch(`https://www.reddit.com//subreddits.json`);
        //const response = await getSubreddits();
        const json = await response.json();
        return json.data.children.map((subreddit) => subreddit.data);
    }
);

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: {
        subredditsList: [],
        isLoading: false,
        error: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubreddits.pending, (state) => {
                state.isLoading = true;
                state.error = false;
            })
            .addCase(fetchSubreddits.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = false;
                state.subredditsList = action.payload;
            })
            .addCase(fetchSubreddits.rejected, (state) => {
                state.isLoading = false;
                state.error = true;
            })
    }
})

export const selectSubreddits = (state) => state.subreddits.subredditsList;
export const isLoading = (state) => state.subreddits.isLoading;
export const hasError = (state) => state.subreddits.error;

export default subredditsSlice.reducer;