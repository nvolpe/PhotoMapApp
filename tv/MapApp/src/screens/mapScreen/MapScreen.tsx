/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
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
import {RootStackParamList, PhotoAlbum} from '../../../App';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'MapScreen'>;
type MapScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MapScreen'
>;

type Props = {
  route: MapScreenRouteProp;
  navigation: MapScreenNavigationProp;
};

function MapScreen({route, navigation}: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [
    currentPhoto,
    setCurrentPhoto,
  ] = useState<CameraRoll.PhotoIdentifier | null>(null);

  // Todo I think LatLng would want to be set to a United States zoomed out scale
  // so that the very first update would zoom into the users first image.
  const [latLng, setLatLng] = useState<LatLng | null>(null);
  const myTVEventHandler = (event: HWKeyEvent) => {
    console.log(
      '' + event.eventType + ' ' + event.eventKeyAction + ' ' + event.tag,
    );
    if (event.eventType === 'select') {
      // eventHandlerButtonPress();
    } else if (event.eventType === 'swipeLeft') {
      setCurrentIndex(currentIndex - 1);
    } else if (event.eventType === 'swipeRight') {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useTVEventHandler(myTVEventHandler);

  const updateMapAndImage = useCallback(
    async (currentIdx: number) => {
      const {photos} = route.params.photos;

      if (photos && currentIdx < photos.edges.length) {
        let photo = photos.edges[currentIdx];
        setCurrentPhoto(photo);
        updateMap(photo);
      }
    },
    [route],
  );

  useEffect(() => {
    updateMapAndImage(currentIndex);
  }, [currentIndex, updateMapAndImage]);

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
    } else {
      console.log('No Geo Data for Image');
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AppleMap latLng={latLng} />
        <TouchableOpacity
          isTVSelectable={false}
          focusable={false}
          hasTVPreferredFocus={false}
          // onPress={handleButtonPress}
          style={styles.testButton}></TouchableOpacity>
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
    width: 1,
    height: 1,
    // borderColor: 'yellow',
    // backgroundColor: 'purple',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
});

export default MapScreen;
