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
import {StyleSheet, Text, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

declare const global: {HermesInternal: null | {}};

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibmF2b2xwZSIsImEiOiJja2ZrZ2JtcmEwdmcwMndtam5kc3A4MG1kIn0.D4Z19FKgr3p_8s2zEybx0Q',
);

const App = () => {
  return (
    <Text>See Your Changes</Text>
    // <View style={styles.matchParent}>
    //   <MapboxGL.MapView
    //     styleURL={MapboxGL.StyleURL.Dark}
    //     style={styles.matchParent}>
    //     <MapboxGL.Camera followZoomLevel={12} />
    //   </MapboxGL.MapView>
    // </View>
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
