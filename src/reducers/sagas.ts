import {all} from 'redux-saga/effects';
// ADD IMPORT
import { watchAudioPlayer } from './audioPlayer'
import { watchCities } from './localities'
import { watchObjects } from './objects'
import { watchRoutes } from './routes'
import { watchObjectDetailed } from './objectDetailed'
import { watchRouteDetailed } from './routeDetailed'
import { watchAdditional } from './additional';
import { watchGlobal } from './global';

export default function* rootSaga() {
  yield all([
	// ADD WATCHER  
		watchAudioPlayer(),
		watchCities(),
		watchObjects(),
		watchRoutes(),
	watchObjectDetailed(),
	watchRouteDetailed(),
	watchAdditional(), 
	watchGlobal(), 
]);
}
