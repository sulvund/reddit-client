import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, isLoading, hasError, fetchFeed, selectSearchTerm, updateSubreddit } from './feedSlice';
import { PostInFeed } from './PostInFeed';
import { useParams } from 'react-router-dom';

export const Feed = () => {
    const dispatch = useDispatch();
    
    const posts = useSelector(selectAllPosts);
    const searchTerm = useSelector(selectSearchTerm);
    const isLoadingPosts = useSelector(isLoading);
    const hasErrorPosts = useSelector(hasError);

    let { subreddit } = useParams();

    useEffect(() => {
        dispatch(fetchFeed([`r/${subreddit}`, searchTerm]));
        dispatch(updateSubreddit(`r/${subreddit}`));
    }, [dispatch, subreddit, searchTerm])

    if (isLoadingPosts) {
        return <p id='loading'>Loading posts</p>
    }
    if (hasErrorPosts) {
        return <p id='loading'>A network error occured</p>
    }
    
    return (
        <div id='posts'>
            {posts.map(post => (
                <PostInFeed key={post.data.id} post={post.data}/>
            ))}
        </div>
    )
};