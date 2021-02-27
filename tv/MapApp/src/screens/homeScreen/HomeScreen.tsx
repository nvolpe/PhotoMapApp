/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import CameraRoll from '@react-native-community/cameraroll';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// import {ImageData} from '../../testData/ImageData';
// const useIcloudPhotos = false;
// interface PhotoAlbum {
//   photos: CameraRoll.PhotoIdentifiersPage | null;
// }

type RootStackParamList = {
  Home: undefined;
  Details: {testId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  route: HomeScreenRouteProp;
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  // const [photos, setPhotos] = useState<PhotoAlbum>({
  //   photos: null,
  // });

  // const requestPhotos = async () => {
  //   console.log('requestPhotos');
  //   const params = {
  //     first: 20,
  //   };

  //   if (useIcloudPhotos) {
  //     const output: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(
  //       params,
  //     );
  //     setPhotos({photos: output});
  //     console.log('Got Photos', output);
  //   } else {
  //     let testPhotos: PhotoAlbum = {
  //       photos: ImageData,
  //     };
  //     console.log('Got Photos', testPhotos.photos?.edges[1]);
  //     setPhotos({photos: testPhotos.photos});
  //   }
  // };

  // useEffect(() => {
  //   async function getPhotos() {
  //     await requestPhotos();
  //   }
  //   getPhotos();
  // }, []);

  // const handleButtonPress = async () => {
  //   if (photos.photos?.edges[currentIndex] && currentIndex < 7) {
  //     let photo = photos.photos?.edges[currentIndex];
  //     setCurrentPhoto(photo);
  //   }
  // };

  const handleButtonPress = async () => {
    navigation.navigate('Details', {testId: 'foo'});
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          hasTVPreferredFocus={true}
          onPress={handleButtonPress}
          style={styles.testButton}>
          <Text style={styles.sectionTitle}>Select Photos</Text>
        </TouchableOpacity>
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

export default HomeScreen;
