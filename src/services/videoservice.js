import { searchUrl, relatedUrl } from '../shared/constants';
import SearchVideo from '../entities/SearchVideo';
import SuggestedVideo from '../entities/SuggestedVideo'

class VideoService {

    getSearchVideo(text) {
        return fetch(`${searchUrl}${text}`).then(response => {
            return response.json()
        }).then(data => {
            return new SearchVideo(data.items[0].id.videoId)

        })


    }

    getSuggestedVideos(videoId) {
        const url = relatedUrl(videoId)
        return fetch(`${url}`).then(response => {
            return response.json()
        }).then(data => {
            let videos = data.items
            return videos.map(video => {
                return new SuggestedVideo(video.id.videoId, video.snippet.thumbnails.high.url)
            })

        })
    }
}

export default new VideoService();