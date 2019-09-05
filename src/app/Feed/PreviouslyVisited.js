import React, {Fragment} from 'react';
import {SuggestedVideos} from './SuggestedVideos';
import {NoPreviousVideos} from './NoPreviousVideos';
import './PreviouslyVisited.css'

const PreviouslyVisitedVideos = (props) => {

  let local = localStorage.getItem('videos');
  const videos = JSON.parse(local);
  return (

    <Fragment>
      <p id='previous'>Previous</p>
      {local && videos.length !== 1 ? <SuggestedVideos videos={videos.slice(1, videos.length)} onClickHandler={props.onClickHandler}/> : <NoPreviousVideos/>}
    </Fragment>
  )
};

export default PreviouslyVisitedVideos;
