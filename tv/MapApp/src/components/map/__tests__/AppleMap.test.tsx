import React from 'react';
import {render} from '@testing-library/react-native';
import AppleMap from '../AppleMap';
import {LatLng} from 'react-native-maps';

test('Map view renders correctly', () => {
  const coords: LatLng = {
    latitude: 32.849425000000004,
    longitude: -117.27258055555555,
  };

  // this coordinates are wrong. its the initial coordiniates. not the new coords
  // this test is wrong
  const componentUnderTest = render(<AppleMap latLng={null} />);
  componentUnderTest.update(<AppleMap latLng={coords} />);
  expect(componentUnderTest.getByTestId('map')).toBeTruthy(); // bad - should use accessibility.
  expect(componentUnderTest.toJSON()).toMatchSnapshot();
});

test('Map view renders the right initial location', () => {
  const coords: LatLng = {
    latitude: 32.71555153389759,
    longitude: -117.16120383421932,
  };

  const componentUnderTest = render(<AppleMap latLng={coords} />);
  const mapCamera = componentUnderTest.getByTestId('map').props;

  expect(mapCamera.initialCamera.center).toMatchObject(coords);
  expect(componentUnderTest.toJSON()).toMatchSnapshot();
});

// I think i have the syntax sorta right.
// but im retarded because this is a bad test anyways
// i shouldnt be testing the map. the great developers at rnmaps should have already tested it.
// test('test rerender', () => {
//   const coords: LatLng = {
//     latitude: 55.5555,
//     longitude: -333.33333,
//   };

//   const {rerender, getByTestId} = render(<AppleMap latLng={null} />);
//   rerender(<AppleMap latLng={coords} />);
//   const mapProps = getByTestId('map').props;

//   console.log('mapprops', mapProps);
//   // expect(mapProps).toMatchObject(coords);
// });
