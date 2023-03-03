import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'b7a9ec4b6ac9c25552bb6d04ec589e81';
  const API_SECRET = '4de3c34f3c6f6afb';
  const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${API_KEY}&format=json&nojsoncallback=1&per_page=20`;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const cachedPhotos = await AsyncStorage.getItem('photos');
        if (cachedPhotos !== null) {
          setPhotos(JSON.parse(cachedPhotos));
        }

        const response = await axios.get(URL);
        const fetchedPhotos = response.data.photos.photo.map(photo => ({
          id: photo.id,
          title: photo.title,
          url: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
        }));
        setPhotos(fetchedPhotos);
        await AsyncStorage.setItem('photos', JSON.stringify(fetchedPhotos));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const renderPhoto = ({ item }) => (
    <View style={styles.photoContainer}>
      <Image style={styles.photo} source={{ uri: item.url }} />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        keyExtractor={item => item.id}
        renderItem={renderPhoto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  photo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default PhotoGallery;
