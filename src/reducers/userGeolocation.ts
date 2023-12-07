const SET_USER_GEOLOCATION = '[userGeolocation] SET_USER_GEOLOCATION';
const RESET_USER_GEOLOCATION = '[userGeolocation] RESET_USER_GEOLOCATION';

const initialstate = {
	latitude: 0,
	longitude: 0,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_USER_GEOLOCATION:
      return Object.assign({}, {...state, ...action.data});
    case RESET_USER_GEOLOCATION:
      return initialstate;
    default:
      return state;
  }
};

export const setUserGeolocation = (data: any) => ({data, type: SET_USER_GEOLOCATION});
export const resetUserGeolocation = () => ({type: RESET_USER_GEOLOCATION});
