/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import CameraRoll from '@react-native-community/cameraroll';
import {ImageData} from '../../testData/ImageData';
import {RootStackParamList, PhotoAlbum, useIcloudPhotos} from '../../../App';

type AlbumScreenRouteProp = RouteProp<RootStackParamList, 'Album'>;
type AlbumScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Album'
>;

type Props = {
  route: AlbumScreenRouteProp;
  navigation: AlbumScreenNavigationProp;
};

function AlbumScreen({navigation}: Props) {
  const [photos, setPhotos] = useState<PhotoAlbum>({
    photos: null,
  });

  const requestPhotos = async () => {
    console.log('requestPhotos');
    const params = {
      first: 20,
    };

    if (useIcloudPhotos) {
      const output: CameraRoll.PhotoIdentifiersPage = await CameraRoll.getPhotos(
        params,
      );

      const noGeoImages = output.edges.filter((item) => {
        if (item.node.location) {
          if (item.node.location.latitude && item.node.location.longitude) {
            return item;
          }
        }
      });

      output.edges = noGeoImages;

      setPhotos({photos: output});
      console.log('Got icloud Photos', output);
    } else {
      let testPhotos: PhotoAlbum = {
        photos: ImageData,
      };
      console.log('Got test Photos', testPhotos.photos?.edges[1]);
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
    console.log('photos', photos);
    navigation.reset({
      index: 0,
      routes: [{name: 'MapScreen', params: {photos: photos}}],
    });
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

export default AlbumScreen;
