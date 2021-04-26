import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPostComments } from "../../api/reddit";

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
        const json = await response.json();
        const posts = json.data.children.map((post) => post.data);
        const postsWithMetadata = posts.map((post) => ({
            ...post,
            comments: [],
            showComments: false,
            loadingComments: false,
            errorComments: false,
        }));
        
        return postsWithMetadata;
    }
);

/* export const fetchComments = createAsyncThunk(
    'feed/fetchComments',
    async ([permalink, index], thunkAPI) => {
        thunkAPI.dispatch(toggleShowComments(index))

        const response = await fetch(`https://www.reddit.com${permalink}.json`);
        const json = await response.json();
        const data = json[1].data.children.map((comment) => comment.data)
        return data;
    }
); */

export const fetchComments = (index, permalink) => async (dispatch) => {
    try {
      dispatch(toggleShowComments(index));
      const comments = await getPostComments(permalink); // getPostComments are imported from the api file
      dispatch(getCommentsSuccess({ index, comments }));
    } catch (error) {
        console.log(index);
      dispatch(getCommentsFailed(index));
    }
  };


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
        },

        toggleShowComments: (state, action) => {
            state.posts[action.payload].showComments = !state.posts[action.payload].showComments;
            if (!state.posts[action.payload].showComments) {
                return;
            }
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].error = false;
        },
        getCommentsSuccess: (state, action) => {
            state.posts[action.payload.index].loadingComments = false;
            state.posts[action.payload.index].comments = action.payload.comments;
        },
        getCommentsFailed: (state, action) => {
        state.posts[action.payload].loadingComments = false;
        state.posts[action.payload].error = true;
        },
    },
    extraReducers: (builder) => {
        builder
        // fetchFeed
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
        // fetchComments
            /* .addCase(fetchComments.pending, (state, action) => {
                console.log(action);
                state.posts[0].loadingComments = true;
                state.posts[0].errorComments = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                console.log(action);
                state.posts[0].loadingComments = false;
                state.posts[0].errorComments = false;
                state.posts[0].comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                console.log(action);
                state.posts[0].loadingComments = false;
                state.posts[0].errorComments = true;
                state.posts[0].comments = [];
            }) */
    }
});

export const {
    setSearchTerm,
    setSubreddit,
    toggleShowComments,
    getCommentsSuccess,
    getCommentsFailed,
} = feedSlice.actions;

export const selectSubreddit = (state) => state.feed.subreddit;
export const selectPosts = (state) => state.feed.posts;
export const selectSearchTerm = (state) => state.feed.searchTerm;
export const isLoading = (state) => state.feed.isLoading;
export const hasError = (state) => state.feed.error;

export default feedSlice.reducer;