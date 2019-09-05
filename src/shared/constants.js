const apiKey = 'AIzaSyBaWNfcwnG-upYX3Ou3MsRfD5WTnd5J7WA';

export const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&q=`;

export const relatedUrl = (videoId) => {
  return `https://www.googleapis.com/youtube/v3/search?maxResults=10&part=snippet&relatedToVideoId=${videoId}&type=video&key=${apiKey}`
};
