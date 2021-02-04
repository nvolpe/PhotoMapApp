import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Props {
  photo: CameraRoll.PhotoIdentifier | null;
}

const ImageView = (props: Props) => {
  const {photo} = props;

  const renderImage = () => {
    const imageSize = 500;
    const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    if (photo) {
      return (
        <Image
          testID={'image'}
          source={require('../../testData/testImages/test1.jpg')}
          style={imageStyle}
        />
      );
    } else {
      // if we have a missing image.. show it here?
      return <View testID={'emptyView'} />;
    }
  };

  return <View style={styles.container}>{renderImage()}</View>;
};

export default ImageView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  fakeImageStyle: {
    width: 500,
    height: 500,
    backgroundColor: Colors.black,
  },
  image: {
    margin: 4,
  },
});
