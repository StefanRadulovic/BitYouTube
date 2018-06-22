import React from 'react';
import SearchBar from '../partials/SearchBar';
import VideoPost from './VideoPost';
import videoService from '../../services/videoService'
import { SuggestedVideos } from './SuggestedVideos';
import { PreviouslyVisitedVideos } from './PreviouslyVisited'




class FeedPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            videoUrl: 'https://www.youtube.com/embed/',
            defVideo: '',
            returnVideo: null,
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
            this.loadSuggestedVideos(video.id);
            let local = localStorage.getItem('videos')
            if (!local) {
                let visitedVideos = [];
                visitedVideos.push(video)
                localStorage.setItem('videos', JSON.stringify(visitedVideos))
            } else {

                local = JSON.parse(local);


                if (local.length < 20) {


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
        this.loadSuggestedVideos(event.target.id)
        // this.setState({
        //     returnVideo: event.target.id
        // })
        this.loadVideo(event.target.id)

    }
    render() {
        return (
            <div className='container'>
                <SearchBar searchHandler={this.searchHandler} />
                <div className='row'>
                    <div className='col-6'>
                        <div>
                            {(this.state.returnVideo) ? <VideoPost url={`${this.state.videoUrl}${this.state.returnVideo}`} /> : 'Loading...'}
                        </div>
                        <PreviouslyVisitedVideos />
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