/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from '@react-native-community/cameraroll';
import {LatLng} from 'react-native-maps';

import {ImageData} from './src/testData/ImageData';

import AppleMap from './src/components/map/AppleMap';
import ImageView from './src/components/image/ImageView';

const useIcloudPhotos = false;

interface PhotoAlbum {
  photos: CameraRoll.PhotoIdentifiersPage | null;
}

function App() {
  const [photos, setPhotos] = useState<PhotoAlbum>({
    photos: null,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [
    currentPhoto,
    setCurrentPhoto,
  ] = useState<CameraRoll.PhotoIdentifier | null>(null);

  const [latLng, setLatLng] = useState<LatLng | null>(null);

  const requestPhotos = async () => {
    console.log('requestPhotos');
    const params = {
      first: 20,
    };

    if (useIcloudPhotos) {
      const output: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(
        params,
      );
      setPhotos({photos: output});
      console.log('Got Photos', output);
    } else {
      let testPhotos: PhotoAlbum = {
        photos: ImageData,
      };
      // console.log('Got Photos', testPhotos.photos?.edges[1]);
      setPhotos({photos: testPhotos.photos});
    }
  };

  useEffect(() => {
    async function getPhotos() {
      await requestPhotos();
    }
    getPhotos();
  }, []);

  const handleButtonPress = async () => {
    if (photos.photos?.edges[currentIndex] && currentIndex < 7) {
      let photo = photos.photos?.edges[currentIndex];
      setCurrentPhoto(photo);
      updateMap(photo);
    }
  };

  const updateMap = (photo: CameraRoll.PhotoIdentifier | null) => {
    if (
      photo &&
      photo.node.location?.latitude &&
      photo.node.location?.longitude
    ) {
      setLatLng({
        latitude: photo.node.location.latitude,
        longitude: photo.node.location.longitude,
      });
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AppleMap latLng={latLng} />
        <TouchableOpacity
          hasTVPreferredFocus={true}
          style={styles.testButton}
          onPress={handleButtonPress}>
          <Text style={styles.sectionTitle}>Get Photos</Text>
        </TouchableOpacity>
        <ImageView photo={currentPhoto} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  testButton: {
    // flex: 1,
    width: 100,
    height: 100,
    borderColor: 'yellow',
    backgroundColor: 'purple',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default App;
