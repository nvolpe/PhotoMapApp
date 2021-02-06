/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {LatLng} from 'react-native-maps';

interface Props {
  latLng: LatLng | null;
}

const AppleMap = (props: Props) => {
  let map: MapView | null = null;

  // remember I could set this outside of the function component so that it
  // doesnt create a new callback on each render. (avoids lint warning)
  const animateMap = useCallback(
    async (latLng: LatLng | null) => {
      // await animateCamera(latLng);
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
        if (latLng && latLng.latitude && latLng.longitude) {
          camera.center = {
            latitude: latLng.latitude,
            longitude: latLng.longitude,
          };
        }
        // console.log('animated to image', JSON.stringify(photo));
        // console.log('animated to index', currentIndex);
        map.animateCamera(camera, {duration: 10000});
        console.log('map animated to', camera.center);
      } else {
        console.log('no map');
      }
    },
    [map],
  );

  useEffect(() => {
    animateMap(props.latLng);
  }, [props.latLng, animateMap]);

  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
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

  return (
    <MapView
      testID={'map'}
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
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default AppleMap;
