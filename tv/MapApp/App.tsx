/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import ReactNative, {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import CameraRoll from '@react-native-community/cameraroll';
// import MapboxGL from '@react-native-mapbox-gl/maps';

const handleButtonPress = () => {
  console.log('onPress');
  CameraRoll.getPhotos({
    first: 20,
    assetType: 'Photos',
  })
    .then((r) => {
      // this.setState({photos: r.edges});
      console.log('Got photos');
      console.log('photos', r.edges);
    })
    .catch((err) => {
      console.log('err', err);
      //Error Loading Images
    });
};

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <View style={styles.matchParent}>
        <TouchableOpacity style={styles.testButton} onPress={handleButtonPress}>
          <Text>Button 1 Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.testButton} onPress={handleButtonPress}>
          <Text>Button 2 Test</Text>
        </TouchableOpacity>

        {/* <ScrollView>
          {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{uri: p.node.image.uri}}
              />
            );
          })}
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  matchParent: {
    flex: 1,
    backgroundColor: 'gray',
  },
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  testButton: {
    // flex: 1,
    width: 300,
    height: 300,
    backgroundColor: 'green',
  },
});

export default App;
