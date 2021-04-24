import React from 'react';
import Skeleton from "react-loading-skeleton";
import './PostLoading.css';
import getRandomNumber from "../../utils/getRandomNumber";

// temporary view of data structure while loading posts
export const PostLoading = ({ post, type }) => {
    return (
    <div className='post'>
        <div><Skeleton width={getRandomNumber(60, 70)} style={{'marginBottom': '16px'}}/></div>
        <Skeleton width={getRandomNumber(300, 20)}/>
        <Skeleton height={getRandomNumber(100, 400)} style={{'marginBottom': '20px', 'marginTop': '20px'}}/>

        <div className='flex-row'>
            <div className='attribute'>
                <Skeleton width='50px'/>
                <i className="bi bi-arrow-up"/>
                <i className="bi bi-arrow-down"/>
            </div>
            <div className='attribute'>
                <Skeleton width={getRandomNumber(40, 70)}/>
                <i className="bi bi-person"/>
            </div>
            <div className='attribute'>
                <Skeleton width='50px'/>
                <i className="bi bi-clock"/>
            </div>
            <div className='attribute'>
                <Skeleton width='50px'/>
                <i className="bi bi-chat-square"/>
            </div>
        </div>
    </div>
    )
};