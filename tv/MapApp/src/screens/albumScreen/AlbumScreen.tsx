/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';

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

  // const myTVEventHandler = (event: HWKeyEvent) => {
  //   // works without touchable
  //   // not seeing swipe events on simulator
  //   // are swipes from react-navigatin stealing
  //   // console.log('event', event);
  //   console.log(
  //     '' + event.eventType + ' ' + event.eventKeyAction + ' ' + event.tag,
  //   );
  // };

  // useTVEventHandler(myTVEventHandler);

  const handleButtonPress = async () => {
    // navigation.navigate('MapScreen', {anotherTest: 'foo'});
    navigation.reset({
      index: 0,
      routes: [{name: 'MapScreen'}],
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
