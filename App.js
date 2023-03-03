import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { getPhotos } from './caching';

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const loadPhotos = async () => {
      const data = await getPhotos();
      setPhotos(data);
    };

    loadPhotos();
  }, []);

  const handleRefresh = async () => {
    const data = await getPhotos(true);
    setPhotos(data);
  };

  const renderPhotos = () => {
    if (photos.length > 0) {
      return photos.map(photo => (
        <View key={photo.id} style={styles.photoContainer}>
          <Image source={{ uri: photo.url }} style={styles.photo} />
          <Text style={styles.photoTitle}>{photo.title}</Text>
        </View>
      ));
    } else {
      return <Text>No photos found</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navItemText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Button title="Refresh" onPress={handleRefresh} />
        </View>
        {renderPhotos()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  navItem: {
    marginRight: 10,
    padding: 10,
  },
  navItemText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  photoContainer: {
    marginBottom: 20,
  },
  photo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  photoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
