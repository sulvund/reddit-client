import React from 'react';
import Skeleton from "react-loading-skeleton";
import './PostLoading.css';

// temporary view of data structure while loading posts
export const PostLoading = ({ post, type }) => {
    return (
    <div className='post'>
        <Skeleton width='100px' style={{'marginBottom': '16px'}}/>
        <Skeleton width='500px'/>
        <Skeleton height='400px' style={{'marginBottom': '20px', 'marginTop': '20px'}}/>

        <div className='flex-row'>
            <div className='attribute'>
                <Skeleton width='50px'/>
                <i className="bi bi-arrow-up"/>
                <i className="bi bi-arrow-down"/>
            </div>
            <div className='attribute'>
                <Skeleton width='50px'/>
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