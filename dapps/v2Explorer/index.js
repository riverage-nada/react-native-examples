/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
import {name as appName} from './app.json';

// Polyfill Buffer
if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

AppRegistry.registerComponent(appName, () => App);
