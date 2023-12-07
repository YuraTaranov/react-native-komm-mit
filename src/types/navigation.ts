import {RouteProp} from '@react-navigation/native';
import {TScreenNavigationType} from './global';

export type RootStackParamList = {
  // SCREEN PARAMS
  Objects: undefined;
  ObjectDetailed:
    | {
        isNeedToSwitchTrack: boolean;
      }
    | undefined;
  Routes: undefined;
  AboutUs: undefined;
  Settings: undefined;
};
// EXPORT SCREEN PARAMS
export type ObjectsRouteProp = RouteProp<RootStackParamList, 'Objects'>;
export type ObjectDetailedRouteProp = RouteProp<RootStackParamList, 'ObjectDetailed'>;
export type AboutUsRouteProp = RouteProp<RootStackParamList, 'AboutUs'>;
export type SettingsRouteProp = RouteProp<RootStackParamList, 'Settings'>;
export type DirectionsRouteProp = RouteProp<RootStackParamList, 'Routes'>;
