import React from 'react';
import SearchBar from '../partials/SearchBar';
import VideoPost from './VideoPost';
import videoService from '../../services/videoService'




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
            console.log(videos);

            this.setState({
                suggestedVideos: videos
            })

        })
    }
    render() {
        return (
            <div>
                <SearchBar searchHandler={this.searchHandler} />
                {(this.state.returnVideo) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideo}`} /> : 'Loading...'}

            </div>
        )
    }
}

export default FeedPage;