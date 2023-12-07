import {takeLatest, put} from 'redux-saga/effects';
import {navigate, replace} from '@services';
import {TGlobalState, TObject, TScreenNavigationType} from '@types';
import {IGetObjectDetailed} from 'src/types/actions/objectDetailed';
import {formatObject} from '@helpers';
import {IGetObjectDetailedResponse} from 'src/services/http/services/objectDetailed/types';
import {ObjectDetailedService} from '@httpServices';
import {setLoading} from './additional';

const GET_OBJECT_DETAILED = '[objectDetailed] GET_OBJECT_DETAILED';
const SET_OBJECT_DETAILED = '[objectDetailed] SET_OBJECT_DETAILED';
const RESET_OBJECT_DETAILED = '[objectDetailed] RESET_OBJECT_DETAILED';

type TObjectDetailed = TGlobalState['objectDetailed'];

const initialstate: TObjectDetailed = {
  id: '',
  title: '',
  description: '',
  cover: '',
  images: [''],
  order: 1,
  location: {
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    address: '',
  },
  audio: [],
  video: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_OBJECT_DETAILED:
      return Object.assign({}, {...state, ...action.data});
    case RESET_OBJECT_DETAILED:
      return initialstate;
    default:
      return state;
  }
};

export const getObjectDetailed = (
  id: string,
  navigationType: TScreenNavigationType,
  isNeedToSwitchTrack?: boolean,
) => ({
  id,
  navigationType,
  isNeedToSwitchTrack,
  type: GET_OBJECT_DETAILED,
});
export const setObjectDetailed = (data: any) => ({data, type: SET_OBJECT_DETAILED});
export const resetObjectDetailed = () => ({type: RESET_OBJECT_DETAILED});

export function* watchObjectDetailed() {
  yield takeLatest(GET_OBJECT_DETAILED, getObjectDetailedAsync);
}

export function* getObjectDetailedAsync(action: IGetObjectDetailed) {
  yield put(setLoading(true));
  try {
    const body: IGetObjectDetailedResponse = yield ObjectDetailedService.getObjectDetailed(action.id);
    const object: TObject = formatObject(body.data.data.object);
    if (object) {
      yield put(setObjectDetailed(object));
    }
    action.navigationType === 'replace'
      ? replace('ObjectDetailed', {isNeedToSwitchTrack: action?.isNeedToSwitchTrack})
      : navigate('ObjectDetailed', {navigationType: action.navigationType});
  } catch (e) {
    console.log('getObjectDetailedAsync', e);
    navigate('Error404');
  } finally {
    yield put(setLoading(false));
  }
}
