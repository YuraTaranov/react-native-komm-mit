import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import './src/services/localization/i18n';
import {enableScreens} from 'react-native-screens';
import TrackPlayer from 'react-native-track-player';

LogBox.ignoreLogs(['EventEmitter.removeListener', 'onReanimatedPropsChange']);
LogBox.ignoreAllLogs();

enableScreens();
AppRegistry.registerComponent(name, () => gestureHandlerRootHOC(App));
TrackPlayer.registerPlaybackService(() => require('./src/services/audioPlayer'));
