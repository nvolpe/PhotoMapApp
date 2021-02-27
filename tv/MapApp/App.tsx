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
import {View, Text} from 'react-native';
import MapScreen from './src/screens/mapScreen/MapScreen';

function HomeScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen Test</Text>
      <TouchableOpacity
        // hasTVPreferredFocus={true}
        style={styles.testButton}
        onBlur={() => {
          console.log('Home on blur');
        }}
        onFocus={() => {
          console.log('Home on focus');
        }}
        onPress={() => {
          navigation.navigate('Details');
        }}>
        <Text>Nav test</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({navigation}: any) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <TouchableOpacity
        // hasTVPreferredFocus={true}
        style={styles.testButton}
        onBlur={() => {
          console.log('Details on blur');
        }}
        onFocus={() => {
          console.log('Details on focus');
        }}
        onPress={() => {
          navigation.navigate('Map');
        }}>
        <Text>Nav test</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  testButton: {
    width: 100,
    height: 100,
    borderColor: 'yellow',
    backgroundColor: 'purple',
  },
});

export default App;
