import {initialWindowMetrics} from 'react-native-safe-area-context';
import {Dimensions, StyleProp, TextStyle} from 'react-native';

export const {width, height} = Dimensions.get('window');
export const top = initialWindowMetrics?.insets?.top || 20;
export const bottom = initialWindowMetrics?.insets?.bottom || 0;
export const stylesConstant: {header: StyleProp<TextStyle>} = {
  header: {
    alignSelf: 'center',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
};
