import React from 'react';

export const VideoPost = (props) => {


    return (

        <div className='video container'>
            < iframe width="560" height="315" src={props.url} frameBorder="0" allowFullScreen ></iframe>
        </div >
    )

}


export default VideoPost;