import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import ImageView from '../ImageView';
import CameraRoll from '@react-native-community/cameraroll';

// what is fetch mock?
// https://github.com/MattAgn/NewsletterApp/blob/master/src/complex-version/pages/Home/__tests__/Home.test.tsx
//https://github.com/MattAgn/NewsletterApp/blob/master/src/complex-version/pages/Home/test-solutions/Home.testSolution.tsx

// it('should display succesful message on successful subscribe', async () => {
//   // Setup
//   fetchMock.post(NEWSLETTER_ENDPOINT, 200);
//   const page = renderPage(<Home />);
//   // What the user sees
//   const EmailInput = page.getByPlaceholder(wording.emailPlaceholder);
//   const ValidateButton = page.getByText(wording.validateEmail);
//   // What the user does
//   fireEvent.changeText(EmailInput, 'hello@bam.co');
//   fireEvent.press(ValidateButton);
//   // What feedback the user should expect
//   const SuccessMessage = await waitForElement(() =>
//     page.queryByText(wording.subscriptionSuccessful),
//   );
//   expect(SuccessMessage).toBeTruthy();
// });

test('Image view renders correctly with a valid image', () => {
  const testImage: CameraRoll.PhotoIdentifier = {
    node: {
      timestamp: 1605397864,
      group_name: 'All Photos',
      type: 'image',
      location: {
        speed: 0,
        latitude: 32.849425000000004,
        longitude: -117.27258055555555,
        heading: 0,
        altitude: 4.7,
      },
      image: {
        playableDuration: null,
        uri: 'xxx.jpg',
        filename: 'PXL_20201114_235103605.jpg',
        width: 4032,
        height: 3024,
        fileSize: 3619392,
      },
    },
  };

  const componentUnderTest = render(<ImageView photo={testImage} />);
  expect(componentUnderTest.getByTestId('image')).toBeTruthy();

  expect(componentUnderTest.toJSON()).toMatchSnapshot();
});

test('Image view does not render an image view without a photo', () => {
  const testImage: CameraRoll.PhotoIdentifier | null = null;
  const componentUnderTest = render(<ImageView photo={testImage} />);
  expect(componentUnderTest.getByTestId('emptyView')).toBeTruthy();
  expect(componentUnderTest.toJSON()).toMatchSnapshot();
});
