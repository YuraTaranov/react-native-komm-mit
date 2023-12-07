import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const sizes = {
  littleDevice: PixelRatio.get() <= 2 && height / width < 2,
  horizontalCoefficient: width / 375,
  verticalCoefficient: height / 812,
  rem: width > 375 ? 18 : 16,
  window_height: height,
  window_width: width,
  padding: 16,
  pts_2: 2,
  pts_4: 4,
  pts_6: 6,
  pts_8: 8,
  pts_12: 12,
  pts_14: 14,
  pts_16: 16,
  pts_18: 18,
  pts_20: 20,
  pts_24: 24,
  pts_28: 28,
  pts_32: 32,
  pts_40: 40,
  pts_48: 48,
  pts_56: 56,
  pts_64: 64,
  pts_80: 80,
  pts_100: 100,
  pts_120: 120,
};
