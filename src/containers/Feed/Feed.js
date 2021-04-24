import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedList } from "react-animated-list";
import { Button } from 'react-bootstrap';
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
    if (isLoading) {
        return (
            <div id='feed'>
                <AnimatedList animation='zoom'>
                    {[
                        <PostLoading/>,
                        <PostLoading/>,
                        <PostLoading/>,
                        <PostLoading/>
                    ]}
                </AnimatedList>
            </div>
        )
    }

    if (error) {
        return (
            <div className='center'>
                <h3>A network error occured</h3>
                <Button 
                    variant='dark'
                    onClick={() => {dispatch(fetchFeed([`r/${subredditURL}`, searchTerm]))}}
                >
                    Try again
                </Button>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
          <div className="center">
            <h3>No posts matching "{searchTerm}"</h3>
            <Button variant='dark' onClick={() => {dispatch(fetchFeed([`r/${subredditURL}`, '']))}}>
              Go back to r/{subredditURL}
            </Button>
          </div>
        );
      }
    
    return (
        <div id='feed'>
            {posts.map(post => (
                <Post 
                    key={post.data.id} 
                    post={post.data}
                />
            ))}
        </div>
    )
};