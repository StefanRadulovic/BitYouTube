import { searchUrl, relatedUrl } from '../shared/constants';
import SearchVideo from '../entities/SearchVideo';
import SuggestedVideo from '../entities/SuggestedVideo'

class VideoService {

    getSearchVideo(text) {
        return fetch(`${searchUrl}${text}`).then(response => {
            return response.json()
        }).then(data => {
            let video = data.items[0]
            if (video !== undefined && video.id.videoId) {
                return new SearchVideo(video.id.videoId, video.snippet.title, video.snippet.thumbnails.high.url)
            } else {
                return null
            }
        })


    }

    getSuggestedVideos(videoId) {
        const url = relatedUrl(videoId)
        return fetch(`${url}`).then(response => {
            return response.json()
        }).then(data => {
            let videos = data.items
            return videos.map(video => {
                return new SuggestedVideo(video.id.videoId, video.snippet.thumbnails.high.url, video.snippet.title)
            })

        })
    }
}

export default new VideoService();