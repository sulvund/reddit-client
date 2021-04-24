import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, isLoading, hasError, fetchFeed, getSearchTerm, setSubreddit } from './feedSlice';
import { PostInFeed } from '../Post/Post';
import { useParams } from 'react-router-dom';

export const Feed = () => {
    const dispatch = useDispatch();
    
    const posts = useSelector(getPosts);
    const searchTerm = useSelector(getSearchTerm);
    const isLoadingPosts = useSelector(isLoading);
    const hasErrorPosts = useSelector(hasError);

    let { subreddit } = useParams();

    useEffect(() => {
        dispatch(fetchFeed([`r/${subreddit}`, searchTerm]));
        dispatch(setSubreddit(`r/${subreddit}`));
    }, [dispatch, subreddit, searchTerm])

    if (isLoadingPosts) {
        return <p className='center'>Loading posts</p>
    }
    if (hasErrorPosts) {
        return <p className='center'>A network error occured</p>
    }
    
    return (
        <div id='feed'>
            {posts.map(post => (
                <PostInFeed key={post.data.id} post={post.data} type='feed'/>
            ))}
        </div>
    )
};