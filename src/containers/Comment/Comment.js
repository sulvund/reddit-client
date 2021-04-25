import React from "react";

export const Comment = ({ comment }) => {
    return (
        <div className='comment'>
            <hr></hr>
            <h6>{comment.author}</h6>
            <p>{comment.body}</p>
        </div>
    )
}