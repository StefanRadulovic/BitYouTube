import React from 'react';
import SearchBar from '../partials/SearchBar';
import VideoPost from './VideoPost';
import videoService from '../../services/videoService'
import {SuggestedVideos} from './SuggestedVideos';
import PreviouslyVisitedVideos from './PreviouslyVisited';
import {Loading} from '../partials/Loading';
import {NoSearchResult} from './NoSearchResult'

class FeedPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoUrl: 'https://www.youtube.com/embed/',
      defVideo: '',
      returnVideo: null,
      suggestedVideos: [],
      localVideos: null,
      noSearchResult: false
    }
  }

  componentDidMount() {
    const searchInput = this.state.defVideo;
    this.loadVideo(searchInput)
  }

  loadVideo = (searchInput) => {
    videoService.getSearchVideo(searchInput).then(video => {

      if (video) {
        this.setPageTittle(video.title);
        this.setState({
          returnVideo: video.id
        });
        this.loadSuggestedVideos(video.id);
        let local = localStorage.getItem('videos');

        if (!local) {
          this.setVideoInLocalStorage(video)
        } else {
          if (!local.includes(JSON.stringify(video))) {
            this.addVideoInWatchedList(local, video)
          }
          this.setState({
            noSearchResult: false
          })
        }
      } else {
        this.setState({
          noSearchResult: true
        })
      }
    })
  };

  setPageTittle = (title) => {
    document.querySelector('head title').textContent = title
  };

  setVideoInLocalStorage = (video) => {
    let visitedVideos = [];
    visitedVideos.push(video);
    localStorage.setItem('videos', JSON.stringify(visitedVideos));
    this.setState({
      noSearchResult: false
    })
  };

  addVideoInWatchedList(list, video) {
    list = JSON.parse(list);

    if (list.length > 9) {
      list.length = 9
    }

    list.splice(0, 0, video);
    localStorage.setItem('videos', JSON.stringify(list));
  }


  searchHandler = (searchInputValue) => {
    this.loadVideo(searchInputValue)
  };


  loadSuggestedVideos = (videoId) => {
    videoService.getSuggestedVideos(videoId).then(videos => {
      this.setState({
        suggestedVideos: videos
      })

    })
  };

  onClickHandler = (event) => {
    this.loadVideo(event.target.id)
  };

  render() {
    return (
      <div className='container'>
        <SearchBar searchHandler={this.searchHandler}/>
        <div className='row'>
          <div className='col-6'>
            <div>
              {(this.state.noSearchResult) ? <NoSearchResult/> : (this.state.returnVideo) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideo}`}/> : <Loading/>}
            </div>
            <PreviouslyVisitedVideos onClickHandler={this.onClickHandler}/>
          </div>
          <div className='offset-1 col-5'>
            <SuggestedVideos videos={this.state.suggestedVideos} onClickHandler={this.onClickHandler}/>
          </div>
        </div>

      </div>
    )
  }
}

export default FeedPage;
