import {takeLatest, put} from 'redux-saga/effects';
import {TGlobalState, TRoute} from '@types';
import {IGetRoutes, ISetRoutes} from 'src/types/actions/routes';
import {RoutesService} from '@httpServices';
import {IGetRoutesAction, IGetRoutesResponse} from 'src/services/http/services/routes/types';
import {errorHandler, formatObject} from '@helpers';
import {Alert} from 'react-native';
import i18next from 'i18next';

const GET_ROUTES = '[routes] GET_ROUTES';
const SET_ROUTES = '[routes] SET_ROUTES';
const RESET_ROUTES = '[routes] RESET_ROUTES';

type TRoutes = TGlobalState['routes'];

const initialstate: TRoutes = {
  data: [],
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_ROUTES:
      return Object.assign({}, {...state, data: action.data});
    case RESET_ROUTES:
      return initialstate;
    default:
      return state;
  }
};

export const getRoutes: (data: string) => IGetRoutes = data => ({data, type: GET_ROUTES});
export const setRoutes: (data: TRoute[]) => ISetRoutes = data => ({data, type: SET_ROUTES});
export const resetRoutes = () => ({type: RESET_ROUTES});

export function* watchRoutes() {
  yield takeLatest(GET_ROUTES, getRoutesAsync);
}

export function* getRoutesAsync(action: IGetRoutesAction) {
  try {
    const body: IGetRoutesResponse = yield RoutesService.getRoutes(action.data);
    const routes = body.data.data?.guides.map(guide => {
      return {
        ...guide,
        objects: guide.objects.map(obj => formatObject(obj)),
      };
    });
    if (routes.length) {
      yield put(setRoutes(routes));
    }
  } catch (e) {
    if (e?.status === 404) {
      Alert.alert(
        i18next.t('Ошибка'),
        i18next.t(
          'К сожалению, маршруты в вашем городе не найдены. Можете проверить список доступных городов с маршрутами в поиске или настройках приложения',
        ),
      );
    } else {
      errorHandler('getRoutesAsync', e);
    }
  }
}
