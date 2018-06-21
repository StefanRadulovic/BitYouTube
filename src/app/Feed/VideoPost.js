import React from 'react';
import './Video.css'

export const VideoPost = (props) => {
    return (
        < div className='video' >
            < iframe className='video' height="315" src={props.url} frameBorder="0" allowFullScreen ></iframe>
        </div >

    )
}


export default VideoPost;