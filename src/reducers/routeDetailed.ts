import {takeLatest, put, select} from 'redux-saga/effects';
import {navigate, replace} from '@services';
import {TGlobalState, TRoute, TScreenNavigationType} from '@types';
import {IGetRouteDetailed} from 'src/types/actions/routeDetailed';

const GET_ROUTE_DETAILED = '[routeDetailed] GET_ROUTE_DETAILED';
const SET_ROUTE = '[routeDetailed] SET_ROUTE';
const SET_ROUTE_DETAILED = '[routeDetailed] SET_ROUTE_DETAILED';
const SET_ROUTE_OBJECTS_IDS = '[routeDetailed] SET_ROUTE_OBJECTS_IDS';
const SET_ROUTE_COLOR = '[routeDetailed] SET_ROUTE_COLOR';
const RESET_ROUTE_DETAILED = '[routeDetailed] RESET_ROUTE_DETAILED';

type TRouteDetailed = TGlobalState['routeDetailed'];

const initialstate: TRouteDetailed = {
  route: null,
  objects: [],
  routeObjectsIds: [],
  routeColor: '',
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_ROUTE:
      return Object.assign({}, {...state, route: action.data});
    case SET_ROUTE_DETAILED:
      return Object.assign({}, {...state, objects: action.data});
    case SET_ROUTE_OBJECTS_IDS:
      return Object.assign({}, {...state, routeObjectsIds: action.data});
    case SET_ROUTE_COLOR:
      return Object.assign({}, {...state, routeColor: action.data});
    case RESET_ROUTE_DETAILED:
      return initialstate;
    default:
      return state;
  }
};

export const getRouteDetailed = (id: IGetRouteDetailed['id'], navigationType: TScreenNavigationType) => ({
  id,
  navigationType,
  type: GET_ROUTE_DETAILED,
});
export const setRoute = (data: TRouteDetailed['route']) => ({data, type: SET_ROUTE});
export const setRouteDetailed = (data: TRouteDetailed['objects']) => ({data, type: SET_ROUTE_DETAILED});
export const setRouteObjectsIds = (data: TRouteDetailed['routeObjectsIds']) => ({data, type: SET_ROUTE_OBJECTS_IDS});
export const setRouteColor = (data: TRouteDetailed['routeColor']) => ({data, type: SET_ROUTE_COLOR});
export const resetRouteDetailed = () => ({type: RESET_ROUTE_DETAILED});

export function* watchRouteDetailed() {
  yield takeLatest(GET_ROUTE_DETAILED, getRouteDetailedAsync);
}

export function* getRouteDetailedAsync(action: IGetRouteDetailed) {
  const routes: TRoute[] = yield select((state: TGlobalState) => state.routes.data);
  try {
    const findRoute: TRoute = yield routes.find((route: TRoute) => route.id === action.id);
    yield put(setRoute(findRoute));
    yield put(setRouteDetailed(findRoute.objects));
    yield put(setRouteColor(findRoute.color));
    action.navigationType === 'replace' ? replace('RouteDetailedNavigator') : navigate('RouteDetailedNavigator');
  } catch (e) {
    __DEV__ && console.log('getRouteDetailedAsync', e);
    navigate('Error404');
  }
}
