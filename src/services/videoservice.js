import { url } from '../shared/constants';

class VideoService {

    getSearchVideo(text) {
        return fetch(`${url}${text}`).then(response => {
            return response.json()
        }).then(data => {
            return data

        })
    }
}

export default new VideoService();