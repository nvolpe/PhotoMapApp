/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  // ScrollView,
  // Platform,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from '@react-native-community/cameraroll';
// import AssetScaledImageExample from './src/AssetScaledImageExample';
// import MapboxGL from '@react-native-mapbox-gl/maps';

interface Example {
  name: string;
  photos: CameraRoll.PhotoIdentifiersPage | null;
}

function App() {
  const [photos, setPhotos] = useState<Example>({name: 'test', photos: null});

  const handleButtonPress = async () => {
    console.log('onPress');
    const params = {
      first: 20,
    };

    const output: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(
      params,
    );

    setPhotos({name: 'test', photos: output});
  };

  const renderItem = ({item}) => {
    console.log('item', item);
    return <View style={styles.row}>{item ? renderImage(item) : null}</View>;
  };

  const renderImage = (asset: CameraRoll.PhotoIdentifier) => {
    const imageSize = 150;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    return <Image source={asset.node.image} style={imageStyle} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.matchParent}>
        <TouchableOpacity style={styles.testButton} onPress={handleButtonPress}>
          <Text style={styles.sectionTitle}>Get Photos</Text>
        </TouchableOpacity>
        <FlatList
          keyExtractor={(_, idx) => String(idx)}
          renderItem={renderItem}
          style={styles.container}
          data={photos.photos?.edges}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: 100,
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
    width: '100%',
    height: '100%',
  },
  testButton: {
    width: 100,
    height: 100,
    backgroundColor: 'green',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    margin: 4,
  },
  container: {
    width: 500,
    height: 500,
  },
  imageThumb: {
    borderWidth: 1,
    borderColor: 'green',
    width: 500,
    height: 500,
    margin: 5,
    resizeMode: 'contain',
  },
});

export default App;
