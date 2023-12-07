---
to: src/reducers/<%=h.changeCase.camelCase(name)%>.ts
---
import {takeLatest, put, call, select} from 'redux-saga/effects';
import {setLoading} from './additional';
import {httpGet, httpPost, navigate} from '@services';
import {urls} from '@constants';

const GET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] GET_<%=h.changeCase.constant(name)%>';
const SET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] SET_<%=h.changeCase.constant(name)%>';
const RESET_<%=h.changeCase.constant(name)%> = '[<%=h.changeCase.camelCase(name)%>] RESET_<%=h.changeCase.constant(name)%>';

const initialstate = {};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_<%=h.changeCase.constant(name)%>:
      return Object.assign({}, {...state, data: action.data});
    case RESET_<%=h.changeCase.constant(name)%>:
      return initialstate;
    default:
      return state;
  }
};

export const get<%=h.changeCase.pascal(name)%> = () => ({type: GET_<%=h.changeCase.constant(name)%>});
export const set<%=h.changeCase.pascal(name)%> = (data: any) => ({data, type: SET_<%=h.changeCase.constant(name)%>});
export const reset<%=h.changeCase.pascal(name)%> = () => ({type: RESET_<%=h.changeCase.constant(name)%>});

export function* watch<%=h.changeCase.pascal(name)%>() {
  yield takeLatest(GET_<%=h.changeCase.constant(name)%>, get<%=h.changeCase.pascal(name)%>Async);
}

export function* get<%=h.changeCase.pascal(name)%>Async() {
  // const { accessToken } = yield select(state => state.profile)
  yield put(setLoading(true));
  try {
	const body = yield call(() => httpGet(urls.url));
    yield put(setLoading(false));
    if (body.data) {
      yield put(set<%=h.changeCase.pascal(name)%>(body.data));
      // navigate('Route');
    }
  } catch (e) {
	yield put(setLoading(false));
	console.log(e, 'get<%=h.changeCase.pascal(name)%>Async')
  }
}
