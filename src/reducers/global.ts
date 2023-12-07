import {Languages} from '@constants';
import {call, takeLatest} from '@redux-saga/core/effects';
import {all} from 'redux-saga/effects';
import {TGlobalState} from '@types';
import {getCitiesAsync} from './localities';

const INITIAL = '[global] INITIAL';
const SET_FIRST_OPEN_APP = '[global] SET_FIRST_OPEN_APP';
const SET_LANG = '[global] SET_LANG';
const SET_CITY = '[global] SET_CITY';
const RESET_GLOBAL = '[global] RESET_GLOBAL';

type TGlobal = TGlobalState['global'];

const initialState: TGlobal = {
  firstOpenApp: true,
  lang: Languages.UK,
  city: {
    id: '',
    name: '',
  },
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_FIRST_OPEN_APP:
      return Object.assign({}, {...state, firstOpenApp: action.data});
    case SET_LANG:
      return Object.assign({}, {...state, lang: action.data});
    case SET_CITY:
      return Object.assign({}, {...state, city: action.data});
    case RESET_GLOBAL:
      return initialState;
    default:
      return state;
  }
};

export const initial = () => ({type: INITIAL});
export const setFirstOpenApp = (data: TGlobal['firstOpenApp']) => ({
  data,
  type: SET_FIRST_OPEN_APP,
});
export const setLang = (data: TGlobal['lang']) => ({
  data,
  type: SET_LANG,
});
export const setCity = (data: TGlobal['city']) => ({
  data,
  type: SET_CITY,
});

export const resetGlobal = () => ({
  type: RESET_GLOBAL,
});

export function* watchGlobal() {
  yield takeLatest(INITIAL, initialAsync);
}

export function* initialAsync() {
  try {
    yield all([call(getCitiesAsync)]);
  } catch (e) {
    console.log(e, 'initialAsync error');
  }
}
