import {TRegion} from '@types';

export {colors} from './colors';
export {device} from './device';
export {Languages} from './languages';
export {sizes} from './sizes';
export * from './urls';
export * from './shadow';
export * from './scaling';
export * from './safeSpaces';
export * from './httpCodes';
export * from './scaling';
export {fonts} from './fonts';
export const hitSlop = {top: 8, bottom: 8, right: 8, left: 8};
export const BUILD_VERSION = '1.0.0 (1)';
export const GOOGLE_MAPS_APIKEY_IOS = '-';
export const GOOGLE_MAPS_APIKEY_ANDROID = '-';
export const INITIAL_REGION: TRegion = {
  latitude: 50.447875,
  longitude: 30.521948,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};
