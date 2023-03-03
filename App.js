import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomePage from './components/HomePage';
import PhotoGallery from './components/PhotoGallery';
import LeftNavBar from './components/LeftNavBar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="PhotoGallery" component={PhotoGallery} />
        <Stack.Screen name="LeftNavBar" component={LeftNavBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
