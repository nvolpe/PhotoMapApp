/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

require('react-native-screens').enableScreens();

AppRegistry.registerComponent(appName, () => App);
