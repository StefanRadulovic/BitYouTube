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
            returnVideos: null
        }
    }

    componentDidMount() {
        const searchInput = this.state.defVideo
        this.loadVideo(searchInput)
    }
    loadVideo = (searchInput) => {
        videoService.getSearchVideo(searchInput).then(data => {
            this.setState({
                returnVideos: data.items
            });

        })
    }

    render() {
        return (
            <div>
                <SearchBar loadVideo={this.loadVideo} />
                {(this.state.returnVideos) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideos[0].id.videoId}`} /> : 'Loading...'}

            </div>
        )
    }
}

export default FeedPage;