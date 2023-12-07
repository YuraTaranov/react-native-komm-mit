import {width} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: width * 0.48,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  playerContainer: {
    borderRadius: 16,
    opacity: 0.99, // opacity need to fix crash on android with react navigation and webview
  },
  activityContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: width * 0.48,
    width: '100%',
  },
});
