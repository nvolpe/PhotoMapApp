/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
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

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     height: '100%',
//   },
//   testButton: {
//     width: 100,
//     height: 100,
//     borderColor: 'yellow',
//     backgroundColor: 'purple',
//   },
// });

export default App;
