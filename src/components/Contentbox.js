import React, { useState } from 'react';

export const Contentbox = () => {
    const [title, setTitle] = useState('Test');
    const [content, setContent] = useState('');
    const [votes, setVotes] = useState(20);
    const [poster, setPoster] = useState('sulvund');
    const [timeAgo, setTimeAgo] = useState('2H');
    const [comments, setComments] = useState(729);

    return (
    <div className='post'>
        <h5>{title}</h5>
        <div className='content'>
        </div>

        <div className='flex-row'>
            <p className='attribute'>
                {votes}
                <i class="bi bi-arrow-up"></i>
                <i class="bi bi-arrow-down"></i>
            </p>
            <p className='attribute'>
                {poster}
                <i class="bi bi-person"></i>
            </p>
            <p className='attribute'>
                {timeAgo}
                <i class="bi bi-clock"></i>
            </p>
            <p className='attribute'>
                {comments}
                <i class="bi bi-chat-square"></i>
            </p>
        </div>
    </div>
    )
};