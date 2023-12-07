import {takeLatest, put, select} from 'redux-saga/effects';
import { TCity, TGlobalState } from '@types';
import { CitiesService } from '@httpServices';
import { IGetCitiesResponse } from 'src/services/http/services/cities/types';
import { setCity } from './global';
import { errorHandler } from '@helpers';

const GET_CITIES = '[cities] GET_CITIES';
const SET_CITIES = '[cities] SET_CITIES';
const SET_IS_LOADING = '[cities] SET_IS_LOADING';
const RESET_CITIES = '[cities] RESET_CITIES';

type TCities = TGlobalState['localities'];

const initialstate: TCities = {
	cities: [],
	districts: [],
	isLoading: false,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_CITIES:
      return Object.assign({}, {...state, cities: action.data});
	case SET_IS_LOADING:
      return Object.assign({}, {...state, isLoading: action.data});
    case RESET_CITIES:
      return initialstate;
    default:
      return state;
  }
};

export const getCities = () => ({type: GET_CITIES});
export const setCities = (data: TCity[]) => ({data, type: SET_CITIES});
export const setIsLoading = (data: boolean) => ({data, type: SET_IS_LOADING});
export const resetCities = () => ({type: RESET_CITIES});

export function* watchCities() {
  yield takeLatest(GET_CITIES, getCitiesAsync);
}

export function* getCitiesAsync() {
  const chosenCityId: TCity['id'] = yield select((state: TGlobalState) => state.global.city.id)
  try {
	const body: IGetCitiesResponse = yield CitiesService.getCities()
	const cities = body.data.data.cities
    if (cities.length) {
	  const findChosenCity = chosenCityId && cities.find(city => city.id === chosenCityId)
      yield findChosenCity && put(setCity(findChosenCity));
      yield put(setCities(cities.sort((a, b) => a.name.localeCompare(b.name))));
    }
  } catch (e) {
	errorHandler('getCitiesAsync', e)
  }
}
