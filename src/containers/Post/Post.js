import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedList } from "react-animated-list";
import { Comment } from "../Comment/Comment";
import { CommentLoading } from "../Comment/CommentLoading";

export const Post = ({ post, onToggleComments }) => {
    let votes;
    if (post.ups > 1000) {
        votes = `${Math.round(post.ups/1000)}K`
    } else {
        votes = post.ups;
    }

    const created = new Date(post.created_utc * 1000);
    const now = new Date();
    const createdHours = (now - created) / (1000 * 60 * 60)

    let timeAgo;
    if (createdHours > 8765) {
        timeAgo = `${Math.round(createdHours / 8765)} years ago`;
    } else if (createdHours > 720) {
        timeAgo = `${Math.round(createdHours / 720)} months ago`;
    } else if (createdHours > 168) {
        timeAgo = `${Math.round(createdHours / 168)} weeks ago`;
    } else if (createdHours > 24) {
        timeAgo = `${Math.round(createdHours / 24)} days ago`;
    } else {
        timeAgo = `${Math.round(createdHours)} hours ago`;
    }

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

            let thumbnail;
            if (post.thumbnail) {
                thumbnail = <img className='thumnail' src={post.thumbnail} alt=''></img>
            } else {
                break;
            }

            content = (
                <>
                    {thumbnail}
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
            /* if (type !== 'detail-view') {
                content = (<p >{`${post.selftext.substring(0,200)}...`}</p>)
            } else { */
                content = (<p >{post.selftext}</p>)
            /* } */
            break;
        default: 
            break;
    }

    const [voteValue, setVoteValue ] = useState(0);

    const onHandleVote = (newValue) => {
      if (newValue === voteValue) {
        setVoteValue(0);
      } else if (newValue === 1) {
        setVoteValue(1);
      } else {
        setVoteValue(-1);
      }
    };
    
    const renderComments = () => {
      if (post.loadingComments) {
        return (
          <AnimatedList animation='zoom'>
            {[
              <CommentLoading />,
              <CommentLoading />,
              <CommentLoading />
            ]}
          </AnimatedList>
        )
      }

      if (post.loadingComments) {
        return (
          <p className='center'>An error occured</p>
        )
      }

      if (post.showComments) {
        return (
          <div className='comment-section'>
            {post.comments.map((comment) => (
              <Comment comment={comment} key={comment.id} />
            ))}
          </div>
        )
      }

      return null;
    }

    return (
      <div className="post">
        <Link
          className="post-subreddit"
          to={`/${post.subreddit_name_prefixed}`}
        >
          <p>{post.subreddit_name_prefixed}</p>
        </Link>
        <Link className="post-title" to={post.permalink}>
          <h5>{post.title}</h5>
        </Link>
        <div className="content">{content}</div>

        <div className="flex-row">
          <p className="attribute">
            {votes}
            <span onClick={() => onHandleVote(1)} >
              <i className={`bi bi-arrow-up ${
                voteValue === 1 && 'active'
                }`}/>
            </span>
            <span onClick={() => onHandleVote(-1)}>
              <i className={`bi bi-arrow-down ${
                voteValue === -1 && 'active'
                }`}/>
            </span>
          </p>
          <p className="attribute">
            {post.author}
            <i className="bi bi-person" />
          </p>
          <p className="attribute">
            {timeAgo}
            <i className="bi bi-clock" />
          </p>
          <p className="attribute" onClick={()=>onToggleComments(post.permalink)}>
            {post.num_comments}
            <i className="bi bi-chat-square" />
          </p>
        </div>
        {renderComments()}
      </div>
    );
};