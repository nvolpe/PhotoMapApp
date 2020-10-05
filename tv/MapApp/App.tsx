/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
// import MapboxGL from '@react-native-mapbox-gl/maps';

declare const global: {HermesInternal: null | {}};

// MapboxGL.setAccessToken(
//   'pk.eyJ1IjoibmF2b2xwZSIsImEiOiJja2ZrZ2JtcmEwdmcwMndtam5kc3A4MG1kIn0.D4Z19FKgr3p_8s2zEybx0Q',
// );

const App = () => {
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
        //Error Loading Images
      });
  };

  handleButtonPress();

  return (
    <View style={styles.matchParent}>
      <View style={styles.testButton}>
        <Text>Button 1</Text>
        <TouchableOpacity onPress={handleButtonPress} />
      </View>
      <View style={styles.testButton}>
        <Text>Button 2</Text>
        <TouchableOpacity onPress={handleButtonPress} />
      </View>

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
  );
};

const styles = StyleSheet.create({
  matchParent: {
    flex: 1,
    backgroundColor: 'blue',
  },
  // scrollView: {
  //   backgroundColor: Colors.lighter,
  // },
  engine: {
    position: 'absolute',
    right: 0,
  },

  // body: {
  //   backgroundColor: Colors.white,
  // },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  testButton: {
    flex: 2,
    // width: 500,
    // height: 500,
    backgroundColor: 'green',
  },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   color: Colors.black,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  //   color: Colors.dark,
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   color: Colors.dark,
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default App;
