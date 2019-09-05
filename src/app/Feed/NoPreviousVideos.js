import React from 'react';
import './NoPreviousVideos.css';
import img from '../../images/img.png'

export const NoPreviousVideos = () => {
  return (
    <div>
      <div className="container">
        <div className="sad_icon"><img src={img} id="sadface"/></div>
        <p className="sad_icon"> No videos watched</p>
      </div>
    </div>
  )
};
