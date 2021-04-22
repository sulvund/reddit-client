import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, isLoadingPosts, fetchPosts, selectSearchTerm } from './postSlice';
import { Post } from './Post';

export const Posts = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingPosts);
    const posts = useSelector(selectAllPosts);
    const searchTerm = useSelector(selectSearchTerm);

    useEffect(() => {
        dispatch(fetchPosts(searchTerm))
    }, [dispatch, searchTerm])

    if (isLoading) {
        return <p id='loading'>Loading posts</p>
    }
    
    return (
        <div id='posts'>
            {posts.map(post => (
                <Post key={post.data.id} post={post.data}/>
            ))}
        </div>
    )
};