import React from "react";
import Skeleton from "react-loading-skeleton";
import getRandomNumber from "../../utils/getRandomNumber";

export const CommentLoading = ({ comment }) => {
    return (
        <div className='comment'>
            <hr></hr>
            <Skeleton width={getRandomNumber(40, 50)}/>
            <Skeleton height={getRandomNumber(10, 40)}/>
        </div>
    )
}