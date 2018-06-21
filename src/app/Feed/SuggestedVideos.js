import React from 'react';
import './SuggestedVideo.css'

export const SuggestedVideos = (props) => {
    return props.videos.map(video => {
        return (
            <div className='row' key={video.id}>
                <div className='col-6'>
                    <img src={video.imgUrl} alt='' id={video.id} onClick={props.onClickHandler} />
                </div>
                <div className='col-6'>
                    <p>{video.title}</p>
                </div>

            </div>
        )
    })

}