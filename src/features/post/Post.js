import React, { useState } from 'react';

export const Post = ({ post }) => {
    //const [title, setTitle] = useState('Test');
    const [content, setContent] = useState('');
    //const [votes, setVotes] = useState(20);
    //const [poster, setPoster] = useState('sulvund');
    //const [timeAgo, setTimeAgo] = useState('2H');
    //const [comments, setComments] = useState(729);

    const created = new Date(post.created_utc * 1000);
    const now = new Date();
    const createdHours = (now - created) / (1000 * 60 * 60)

    return (
    <div className='post'>
        <p className='subreddit'>{post.subreddit_name_prefixed}</p>
        <h5>{post.title}</h5>
        <div className='content'>
            <img src={post.url} alt={post.title}>

            </img>
        </div>

        <div className='flex-row'>
            <p className='attribute'>
                {Math.round(post.ups/1000)}K
                <i className="bi bi-arrow-up"></i>
                <i className="bi bi-arrow-down"></i>
            </p>
            <p className='attribute'>
                {post.author}
                <i className="bi bi-person"></i>
            </p>
            <p className='attribute'>
                {Math.round(createdHours)} hours ago
                <i className="bi bi-clock"></i>
            </p>
            <p className='attribute'>
                {post.num_comments}
                <i className="bi bi-chat-square"></i>
            </p>
        </div>
    </div>
    )
};