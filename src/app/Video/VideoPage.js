import React from 'react';
import videoService from '../../services/videoService'

export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: 'https://www.youtube.com/embed/',
            defVideo: 'hotel claifornia',
            returnVideos: null
        }
    }

    componentDidMount() {

        videoService.getSearchVideo(this.state.defVideo).then(data => {
            console.log(data.items[0].id.videoId);

            this.setState({
                returnVideos: data.items
            });

        })
    }

    render() {
        return (

            <div>
                {(this.state.returnVideos) ?
                    < iframe width="560" height="315" src={`${this.state.videoUrl}${this.state.returnVideos[0].id.videoId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen ></iframe> : ''}
            </div >
        )

    }
}