import { fetchSubreddits, selectSubreddits, isLoading, hasError } from '../Subreddits/subredditsSlice';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import './Subreddits.css'

export const Subreddits = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch])

    const subreddits = useSelector(selectSubreddits);
    const loading = useSelector(isLoading)
    const error = useSelector(hasError)

    if (loading) {
        return (<p className='subreddits'>Loading subreddits</p>)
    }

    if (error) {
        console.log('Could not fetch subreddits');
    }

    return (
        <div className='subreddits'>
            {subreddits.map((subreddit) => (
                <div className='subreddits-container'>
                    <Link to={subreddit.url} className='subreddit'>{subreddit.url}</Link>
                </div>

            ))}
        </div>
    )
}