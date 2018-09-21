import {AppRegistry} from 'react-native';
import App from './App';
import './app/Common/SetTheme';
import './app/Common/Global';

console.disableYellowBox = true;
AppRegistry.registerComponent('Moniter', () => App);
