import {takeLatest, put} from 'redux-saga/effects';
import {IGetObjects, ISetObjects} from 'src/types/actions/objects';
import {TGlobalState, TObject} from '@types';
import {ObjectsService} from '@httpServices';
import {IGetObjectsAction, IGetObjectsResponse} from 'src/services/http/services/objects/types';
import {formatObject} from '@helpers';

const GET_OBJECTS = '[objects] GET_OBJECTS';
const SET_OBJECTS = '[objects] SET_OBJECTS';
const RESET_OBJECTS = '[objects] RESET_OBJECTS';

type TObjects = TGlobalState['objects'];

const initialstate: TObjects = {
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_OBJECTS:
      return Object.assign({}, {...state, data: action.data});
    case RESET_OBJECTS:
      return initialstate;
    default:
      return state;
  }
};

export const getObjects: (data: string) => IGetObjects = data => ({data, type: GET_OBJECTS});
export const setObjects: (data: TObject[]) => ISetObjects = data => ({data, type: SET_OBJECTS});
export const resetObjects = () => ({type: RESET_OBJECTS});

export function* watchObjects() {
  yield takeLatest(GET_OBJECTS, getObjectsAsync);
}

export function* getObjectsAsync(action: IGetObjectsAction) {
  try {
    const body: IGetObjectsResponse = yield ObjectsService.getObjects(action.data);
    const objects: TObject[] = body.data.data.objects.map(obj => formatObject(obj));
    if (objects.length) {
      yield put(setObjects(objects));
    }
  } catch (e) {
    console.log(e, 'getObjectsAsync');
  }
}
