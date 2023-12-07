import {Platform, Appearance} from 'react-native';
export const darkMode = Appearance.getColorScheme() === 'dark';
import * as IphoneXHelper from 'react-native-iphone-x-helper';

export const device = {
  isIos: Platform.OS === 'ios',
  isDarkMode: Appearance.getColorScheme() === 'dark',
  isIphoneX: IphoneXHelper.isIphoneX(),
};
