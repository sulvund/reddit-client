import React from 'react';

export const Post = ({ post }) => {
    const created = new Date(post.created_utc * 1000);
    const now = new Date();
    const createdHours = (now - created) / (1000 * 60 * 60)

    let content;
    switch (post.post_hint) {
        case 'image':
            content = (<img src={post.url} alt={post.title}></img>)
            break;
        case 'link':
            let link;
            if (post.url.length > 40) {
                link = `${post.url.substring(0,40)}...`;
            } else {
                link = post.url;
            }

            /* let thumbnail;
            if (post.thumbnail) {
                thumbnail = <img className='thumnail' src={post.thumbnail} alt=''></img>;
            } */

            content = (
                <>
                    {<img className='thumnail' src={post.thumbnail} alt=''></img>}
                    <a href={post.url}><p>{link}</p></a>
                </>
            )
            break;
        case 'hosted:video':
            content = (
                <video width="100%" height="auto" controls>
                    <source src={post.media.reddit_video.scrubber_media_url} type="video/mp4"></source>
                </video>
            )
            break;
        case 'rich:video':
            content = (
                <iframe
                    width="560"
                    height="315"
                    src={post.url_overridden_by_dest}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen>
                </iframe>
            )
            break;
        case 'self':
            content = (<p >{post.selftext}</p>)
            break;
        default: 
            content = (<p>{post.selftext}</p>)
    }

    return (
    <div className='post'>
        <p className='subreddit'>{post.subreddit_name_prefixed}</p>
        <h5>{post.title}</h5>
        <div className='content'>
            {content}
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