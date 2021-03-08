import React from 'react';
import {StyleSheet, Image, View} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useIcloudPhotos} from '../../../App';

interface Props {
  photo: CameraRoll.PhotoIdentifier | null;
}

const ImageView = (props: Props) => {
  const {photo} = props;

  const renderImage = () => {
    // const imageSize = 500;
    // const imageStyle = [styles.image, {width: imageSize, height: imageSize}];
    if (photo) {
      return (
        <Image
          testID={'image'}
          resizeMode={'cover'}
          source={
            useIcloudPhotos
              ? {uri: photo.node.image.uri}
              : require('../../testData/testImages/test1.jpg')
          }
          style={styles.imageStyle}
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
    width: 520,
    height: 520,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  imageStyle: {
    margin: 10,
    width: 500,
    height: 500,
  },
});
