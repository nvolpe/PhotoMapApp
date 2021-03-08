/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from './src/screens/mapScreen/MapScreen';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import AlbumScreen from './src/screens/albumScreen/AlbumScreen';
import 'react-native/tvos-types.d';

import CameraRoll from '@react-native-community/cameraroll';

// Global types and settings
export interface PhotoAlbum {
  photos: CameraRoll.PhotoIdentifiersPage | null;
}

export type RootStackParamList = {
  Home: undefined;
  Album: {testId: string};
  MapScreen: {photos: PhotoAlbum};
};

export const useIcloudPhotos = true;

// End -------------

const Stack = createStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="Album"
          component={AlbumScreen}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
