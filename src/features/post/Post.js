import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fetchPost, selectPost, isLoading, hasError } from '../post/postSlice';
import { updateSubreddit } from "../feed/feedSlice";
import { useSelector, useDispatch } from "react-redux";
import { PostInFeed } from "../feed/PostInFeed";

export const Post = () => {
    const { subreddit, type, id, title_id } = useParams();
    const slug = `${subreddit}/${type}/${id}/${title_id}`

    const dispatch = useDispatch();
    
    const post = useSelector(selectPost);
    //const searchTerm = useSelector(selectSearchTerm);
    const isLoadingPosts = useSelector(isLoading);
    const hasErrorPosts = useSelector(hasError);
    
    useEffect(() => {
        dispatch(fetchPost(slug));
        dispatch(updateSubreddit(`r/${subreddit}`));
    }, [dispatch, subreddit, slug])


    if (isLoadingPosts) {
        return <p className='center'>Loading post</p>
    }
    if (hasErrorPosts) {
        return <p className='center'>A network error occured</p>
    }

    return (
        <div id='feed'>
            <PostInFeed post={post} type='detail-view'/>
        </div>
    )
}