import {TGlobalState} from '@types';

const SET_LOADING = '[additional] SET_LOADING';

type TAdditional = TGlobalState['additional'];

const initialState: TAdditional = {
  loading: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, {...state, loading: action.data});

    default:
      return state;
  }
};

export const setLoading = (data: TAdditional['loading']) => ({
  data,
  type: SET_LOADING,
});

export function* watchAdditional() {}
