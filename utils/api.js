import axios from 'axios';

const API_KEY = 'dade5267bbe9cb1369927174d77067cc';
const BASE_URL = 'https://www.flickr.com/services/rest/';

export const getRecentPhotos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=20`);
    return response.data.photos.photo.map(photo => ({
      id: photo.id,
      title: photo.title,
      url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
    }));
  } catch (error) {
    console.log(error);
  }
};
