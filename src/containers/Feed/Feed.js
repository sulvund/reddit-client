import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedList } from "react-animated-list";
import { /* selectPosts, isLoading, hasError, selectSearchTerm, */ setSubreddit, fetchFeed } from './feedSlice';
import { PostLoading } from "../Post/PostLoading";
import { Post } from '../Post/Post';
import { useParams } from 'react-router-dom';

export const Feed = () => {
    const feed = useSelector((state) => state.feed)
    const { posts, isLoading, error, searchTerm } = feed;
    const dispatch = useDispatch();

    let { subredditURL } = useParams();

    useEffect(() => {
        dispatch(fetchFeed([`r/${subredditURL}`, searchTerm]));
        dispatch(setSubreddit(`r/${subredditURL}`));
    }, [dispatch, subredditURL, searchTerm])

    /* [<p className='center'>Loading posts</p>] */
    if (!isLoading) {
        return (
            <div id='feed'>
                <AnimatedList animation='zoom'>
                    {[<PostLoading/>]}
                </AnimatedList>
            </div>
        )
    }

    if (error) {
        return <p className='center'>A network error occured</p>
    }
    
    return (
        <div id='feed'>
            {posts.map(post => (
                <Post key={post.data.id} post={post.data} type='feed'/>
            ))}
        </div>
    )
};