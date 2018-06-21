import React from 'react';
import SearchBar from '../partials/SearchBar';
import VideoPost from './VideoPost';
import videoService from '../../services/videoService'
import { SuggestedVideos } from './SuggestedVideos';




class FeedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: 'https://www.youtube.com/embed/',
            defVideo: '',
            returnVideos: null,
            suggestedVideos: []
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
            this.loadSuggestedVideos(video.id)
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
        console.log(event.target.id)
    }
    render() {
        return (
            <div className='container'>
                <SearchBar searchHandler={this.searchHandler} />
                <div className='row'>
                    <div className='col-6'>
                        {(this.state.returnVideo) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideo}`} /> : 'Loading...'}
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