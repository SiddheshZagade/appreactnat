import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecentPhotos } from './api';

const PHOTOS_KEY = 'photos';
const HOMEPAGE_KEY = 'homepage';

export const retrieveData = async key => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getHomePageFromCache = async () => {
  try {
    const cachedHomePage = await retrieveData(HOMEPAGE_KEY);
    if (cachedHomePage !== null) {
      return JSON.parse(cachedHomePage);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getHomePageFromApi = async () => {
  try {
    const photos = await getRecentPhotos();
    await storeData(HOMEPAGE_KEY, JSON.stringify(photos));
    return photos;
  } catch (error) {
    console.log(error);
  }
};

export const getHomePage = async () => {
  let homepage = await getHomePageFromCache();
  if (!homepage) {
    homepage = await getHomePageFromApi();
  }
  return homepage;
};

export const getPhotosFromCache = async () => {
  try {
    const cachedPhotos = await retrieveData(PHOTOS_KEY);
    if (cachedPhotos !== null) {
      return JSON.parse(cachedPhotos);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPhotosFromApi = async () => {
  try {
    const photos = await getRecentPhotos();
    await storeData(PHOTOS_KEY, JSON.stringify(photos));
    return photos;
  } catch (error) {
    console.log(error);
  }
};

export const getPhotos = async () => {
  let photos = await getPhotosFromCache();
  if (!photos) {
    photos = await getPhotosFromApi();
  }
  return photos;
};
