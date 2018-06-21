import React from 'react';
import SearchBar from '../partials/SearchBar';
import VideoPost from './VideoPost';
import videoService from '../../services/videoService'
import { SuggestedVideos } from './SuggestedVideos';
import PreviouslyVisitedVideos from './PreviouslyVisited'
import {Loading} from '../partials/Loading'




class FeedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: 'https://www.youtube.com/embed/',
            defVideo: '',
            returnVideo: null,
            suggestedVideos: [],
            localVideos: null

        }
    }

    componentDidMount() {
        const searchInput = this.state.defVideo
        this.loadVideo(searchInput)
    }
    loadVideo = (searchInput) => {
        videoService.getSearchVideo(searchInput).then(video => {
            this.setState({
                returnVideo: video.id
            });
            this.loadSuggestedVideos(video.id);
            let local = localStorage.getItem('videos')
            
            if (!local) {
                let visitedVideos = [];
                visitedVideos.push(video)
                localStorage.setItem('videos', JSON.stringify(visitedVideos))
            } else {
                if (!local.includes(JSON.stringify(video))) {
                    local = JSON.parse(local);
                    
                    if (local.length > 9) {
                        local.length = 9
                    }
                    local.splice(0, 0, video);
                    localStorage.setItem('videos', JSON.stringify(local))
                   

                }
            }
        })
    }
    searchHandler = (searchInputValue) => {
        this.loadVideo(searchInputValue)
    }
    loadSuggestedVideos = (videoId) => {
        videoService.getSuggestedVideos(videoId).then(videos => {
            this.setState({
                suggestedVideos: videos
            })

        })
    }
    onClickHandler = (event) => {
        this.loadVideo(event.target.id)
    }


    render() {
        return (
            <div className='container'>
                <SearchBar searchHandler={this.searchHandler} />
                <div className='row'>
                    <div className='col-6'>
                        <div>
                            {(this.state.returnVideo) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideo}`} /> : <Loading />}
                        </div>
                       <PreviouslyVisitedVideos onClickHandler={this.onClickHandler} />
                    </div>
                    <div className='offset-1 col-5'>
                        <SuggestedVideos videos={this.state.suggestedVideos} onClickHandler={this.onClickHandler} /> 
                    </div>
                </div>

            </div>
        )
    }
}

export default FeedPage;