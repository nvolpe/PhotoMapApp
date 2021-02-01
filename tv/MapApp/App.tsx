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
  // Image,
  // Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import MapView from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import CameraRoll from '@react-native-community/cameraroll';
// import ImageData from './src/testData/ImageData';

// interface PhotoAlbum {
//   photos: CameraRoll.PhotoIdentifiersPage | null;
// }

// const LATITUDE = 37.78825;
// const LONGITUDE = -122.4324;

// const useIcloudPhotos = false;

function App() {
  let map: MapView | null;

  // useEffect(() => {
  //   async function getPhotos() {
  //     await requestPhotos();
  //   }
  //   getPhotos();
  // }, []);

  // const [photos, setPhotos] = useState<PhotoAlbum>({
  //   photos: null,
  // });
  // const [currentIndex, setCurrentIndex] = useState<number>(0);

  // const requestPhotos = async () => {
  //   const params = {
  //     first: 20,
  //   };

  //   if (useIcloudPhotos) {
  //     const output: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(
  //       params,
  //     );
  //     setPhotos({photos: output});
  //   } else {
  //     console.log('got photos');

  //     let testPhotos: PhotoAlbum = {
  //       photos: ImageData, //fix type in test file
  //     };
  //     setPhotos({photos: testPhotos.photos});
  //   }
  // };

  const handleButtonPress = async () => {
    console.log('button press');
    // setCurrentIndex((prevState) => {
    //   return prevState + 1;
    // });

    testAnimate();

    // console.log('photos?', JSON.stringify(photos));

    // if (photos.photos && photos.photos.edges[currentIndex]) {
    //   await animateCamera(photos.photos.edges[currentIndex]);
    // }
  };

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  };

  // const animateCamera = async (photo: CameraRoll.PhotoIdentifier) => {
  //   // get photo here and animate to it
  //   // probably better to send photos as a prop to a map componet
  //   // start to split things out into components.

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
  //     if (photo.node.location?.latitude) {
  //       camera.center.latitude = photo.node.location.latitude;
  //     }
  //     console.log('map animated to this photo', JSON.stringify(photo));
  //     map.animateCamera(camera, {duration: 10000});
  //   } else {
  //     console.log('no map');
  //   }
  // };

  const testAnimate = async () => {
    if (map) {
      const camera = await map.getCamera();
      console.log('camera', camera);

      // camera.heading += 45;
      // camera.pitch += 50;
      // camera.altitude -= 2000;

      camera.heading = getRandomInt(1, 45); //need to keep this number runder 360 im sure
      camera.pitch = getRandomInt(1, 50); // how high can this number go?
      camera.altitude = getRandomInt(1500, 2500); //what makes sense here?
      // camera.zoom -= 1;
      // camera.center.latitude += 0.05;
      map.animateCamera(camera, {duration: 10000});
    } else {
      console.log('no map');
    }
  };

  // const renderImage = (asset: CameraRoll.PhotoIdentifier) => {
  //   const imageSize = 150;
  //   const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
  //   return <Image source={asset.node.image} style={imageStyle} />;
  // };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MapView
          scrollEnabled={false}
          ref={(ref) => {
            console.log('on ref set');
            map = ref;
          }}
          // mapType={'hybrid'}
          style={styles.map}
          region={{
            latitude: 32.71795444867246,
            longitude: -117.1587698462926,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
        <TouchableOpacity
          hasTVPreferredFocus={true}
          style={styles.testButton}
          onPress={handleButtonPress}>
          <Text style={styles.sectionTitle}>Get Photos</Text>
        </TouchableOpacity>
        <TouchableOpacity hasTVPreferredFocus={false} style={styles.testButton}>
          <Text style={styles.sectionTitle}>Button 2</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    // backgroundColor: 'green',
    // width: 800,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
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
});

export default App;
