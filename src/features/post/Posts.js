import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts, isLoadingPosts, fetchPosts } from './postSlice';
import { Post } from './Post';

export const Posts = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(isLoadingPosts);
    const posts = useSelector(selectAllPosts);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    if (isLoading) {
        return <p>Loading posts</p>
    }
    console.log(posts);
    return (
        <>
            {posts.map(post => (
                <Post key={post.data.id} post={post.data}/>
            ))}
        </>
    )
};