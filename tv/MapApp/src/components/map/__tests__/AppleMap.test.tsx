import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import AppleMap from '../AppleMap';
import {LatLng} from 'react-native-maps';

test('Map view renders correctly', () => {
  const coords: LatLng = {
    latitude: 32.849425000000004,
    longitude: -117.27258055555555,
  };

  const componentUnderTest = render(<AppleMap latLng={coords} />);
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
