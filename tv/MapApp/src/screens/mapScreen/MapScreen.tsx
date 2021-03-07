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
  useTVEventHandler,
  HWKeyEvent,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CameraRoll from '@react-native-community/cameraroll';
import {LatLng} from 'react-native-maps';

import {ImageData} from '../../testData/ImageData';

import AppleMap from '../../components/map/AppleMap';
import ImageView from '../../components/image/ImageView';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

const useIcloudPhotos = false;

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;
type MapScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MapScreen'
>;

type Props = {
  route: MapScreenRouteProp;
  navigation: MapScreenNavigationProp;
};

interface PhotoAlbum {
  photos: CameraRoll.PhotoIdentifiersPage | null;
}

function MapScreen({navigation}: Props) {
  const [photos, setPhotos] = useState<PhotoAlbum>({
    photos: null,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [
    currentPhoto,
    setCurrentPhoto,
  ] = useState<CameraRoll.PhotoIdentifier | null>(null);

  const [latLng, setLatLng] = useState<LatLng | null>(null);

  console.log('map screen inti');

  const myTVEventHandler = (event: HWKeyEvent) => {
    // works without touchable
    // not seeing swipe events on simulator
    // are swipes from react-navigatin stealing
    // console.log('event', event);
    console.log(
      '' + event.eventType + ' ' + event.eventKeyAction + ' ' + event.tag,
    );
    if (event.eventType === 'select') {
      handleButtonPress();
    }
  };

  useTVEventHandler(myTVEventHandler);

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
      console.log('Got Photos', testPhotos.photos?.edges[1]);
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

export default MapScreen;
