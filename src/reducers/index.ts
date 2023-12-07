import {combineReducers} from 'redux';

export default combineReducers({
  routeDetailed: require('./routeDetailed').default,
  objectDetailed: require('./objectDetailed').default,
  routes: require('./routes').default,
  objects: require('./objects').default,
  localities: require('./localities').default,
  audioPlayer: require('./audioPlayer').default,
	// ADD NEW REDUCER
  global: require('./global').default,
  additional: require('./additional').default,
  userGeolocation: require('./userGeolocation').default,
});
