import {Languages} from '@constants';
import {TCity, TCoordinates, TObject, TRoute} from './global';

export type TGlobalState = {
  global: {
    firstOpenApp: boolean;
    lang: Languages;
    city: TCity;
  };
  additional: {
    loading: boolean;
  };
  userGeolocation: TCoordinates;
  routes: {
    data: TRoute[];
  };
  routeDetailed: {
    route: TRoute | null;
    objects: TObject[];
    routeObjectsIds: string[];
    routeColor: string;
  };
  objects: {
    data: TObject[];
  };
  objectDetailed: TObject;
  localities: {
    cities: TCity[];
    districts: TCity[];
    isLoading: boolean;
  };
  audioPlayer: {
    playerVisible: boolean;
    isPlaying: boolean;
    isNeedBottomMargin: boolean;
  };
};
