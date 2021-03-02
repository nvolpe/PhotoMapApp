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
// import {View, Text} from 'react-native';
import MapScreen from './src/screens/mapScreen/MapScreen';
import HomeScreen from './src/screens/homeScreen/HomeScreen';
import AlbumScreen from './src/screens/albumScreen/AlbumScreen';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Album: {testId: string};
  MapScreen: {anotherTest: string};
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
