import {colors} from '@constants';
import {Platform} from 'react-native';

export const shadow = Platform.select({
  ios: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: '#000000',
    shadowRadius: 9,
  },
  android: {
    elevation: 2,
  },
});
