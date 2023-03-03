import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { getPhotos } from './caching';
import HomePage from './HomePage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos().then((data) => {
      setPhotos(data);
    });
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} options={{ title: 'Home', headerShown: true }} initialParams={{ photos }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
