/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/App';
import {name as appName} from './app.json';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// Polyfill Buffer
if (typeof Buffer === 'undefined') {
  global.Buffer = require('buffer').Buffer;
}

// window.open = uri => {
//   Linking.openURL(uri);
// };

// Polyfill localStorage
// window.localStorage = {
//   getItem: async key => {
//     console.log('llamada');
//     const value = await AsyncStorage.getItem(key);
//     console.log('getItem', key, value);
//     return value;
//   },
//   setItem: (key, value) => {
//     AsyncStorage.setItem(key, JSON.stringify(value));
//   },
// };

AppRegistry.registerComponent(appName, () => App);
