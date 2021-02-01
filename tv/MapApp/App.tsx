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
  Image,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import CameraRoll from '@react-native-community/cameraroll';
import ImageData from './src/testData/ImageData';

interface PhotoAlbum {
  photos: CameraRoll.PhotoIdentifiersPage | null;
}

const useIcloudPhotos = false;

function App() {
  let map: MapView | null = null;

  useEffect(() => {
    async function getPhotos() {
      await requestPhotos();
    }
    getPhotos();
  }, []);

  const [photos, setPhotos] = useState<PhotoAlbum>({
    photos: null,
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [
    currentPhoto,
    setCurrentPhoto,
  ] = useState<CameraRoll.PhotoIdentifier | null>(null);

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
      await animateCamera(output.edges[currentIndex]);
    } else {
      console.log('got photos');

      let testPhotos: PhotoAlbum = {
        photos: ImageData, //fix type in test file
      };
      setPhotos({photos: testPhotos.photos});
    }
  };

  const handleButtonPress = async () => {
    if (photos.photos?.edges[currentIndex] && currentIndex < 7) {
      await animateCamera(photos.photos?.edges[currentIndex]);
    }
  };

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  const animateCamera = async (photo: CameraRoll.PhotoIdentifier) => {
    setCurrentPhoto(photo);
    if (map) {
      const camera = await map.getCamera();
      // camera.heading += 45;
      // camera.pitch += 50;
      // camera.altitude -= 2000;

      camera.heading = getRandomInt(1, 45); //need to keep this number runder 360 im sure
      camera.pitch = getRandomInt(1, 50); // how high can this number go?
      camera.altitude = getRandomInt(1500, 2000); //what makes sense here?
      // camera.zoom -= 1;
      // camera.center.latitude += 0.05;
      if (photo.node.location?.latitude && photo.node.location?.longitude) {
        camera.center = {
          latitude: photo.node.location.latitude,
          longitude: photo.node.location.longitude,
        };
      }
      // console.log('animated to image', JSON.stringify(photo));
      // console.log('animated to index', currentIndex);
      map.animateCamera(camera, {duration: 10000});
      setCurrentIndex(currentIndex + 1);
    } else {
      console.log('no map');
    }
  };

  // const testAnimate = async () => {
  //   if (map) {
  //     const camera = await map.getCamera();
  //     console.log('camera', camera);
  //     // camera.heading += 45;
  //     // camera.pitch += 50;
  //     // camera.altitude -= 2000;
  //     camera.heading = getRandomInt(1, 45); //need to keep this number runder 360 im sure
  //     camera.pitch = getRandomInt(1, 50); // how high can this number go?
  //     camera.altitude = getRandomInt(1500, 2500); //what makes sense here?
  //     // camera.zoom -= 1;
  //     // camera.center.latitude += 0.05;
  //     map.animateCamera(camera, {duration: 10000});
  //   } else {
  //     console.log('no map');
  //   }
  // };

  const renderImage = () => {
    const imageSize = 500;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    if (currentPhoto) {
      return <Image source={currentPhoto.node.image} style={imageStyle} />;
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          scrollEnabled={false}
          ref={(ref) => {
            if (map == null) {
              console.log('on ref set');
              map = ref;
            }
          }}
          mapType={'standard'}
          style={styles.map}
          initialCamera={{
            pitch: 0,
            heading: 0,
            altitude: 5000,
            center: {
              latitude: 32.71555153389759,
              longitude: -117.16120383421932,
            },
            zoom: 0,
          }}></MapView>
        <TouchableOpacity
          hasTVPreferredFocus={true}
          style={styles.testButton}
          onPress={handleButtonPress}>
          <Text style={styles.sectionTitle}>Get Photos</Text>
        </TouchableOpacity>
        {renderImage()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  image: {
    margin: 4,
  },
});

export default App;
