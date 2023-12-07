import {TGlobalState} from '@types';

const SET_PLAYER_VISIBLE = '[audioPlayer] SET_PLAYER_VISIBLE';
const SET_IS_PLAYING = '[audioPlayer] SET_IS_PLAYING';
const SET_IS_NEED_BOTTOM_MARGIN = '[audioPlayer] SET_IS_NEED_BOTTOM_MARGIN';
const RESET_AUDIO_PLAYER = '[audioPlayer] RESET_AUDIO_PLAYER';

type TAudioPlayer = TGlobalState['audioPlayer']

const initialstate: TAudioPlayer = {
	playerVisible: false,
	isPlaying: false,
	isNeedBottomMargin: true,
};

export default (state = initialstate, action: any) => {
  switch (action.type) {
    case SET_IS_PLAYING:
      return Object.assign({}, {...state, isPlaying: action.data});
	case SET_PLAYER_VISIBLE:
      return Object.assign({}, {...state, playerVisible: action.data});
	case SET_IS_NEED_BOTTOM_MARGIN:
      return Object.assign({}, {...state, isNeedBottomMargin: action.data});
    case RESET_AUDIO_PLAYER:
      return initialstate;
    default:
      return state;
  }
};

export const setIsPlaying = (data: boolean) => ({data, type: SET_IS_PLAYING});
export const setPlayerVisible = (data: boolean) => ({data, type: SET_PLAYER_VISIBLE});
export const setIsNeedBottomMargin = (data: boolean) => ({data, type: SET_IS_NEED_BOTTOM_MARGIN})
export const resetAudioPlayer = () => ({type: RESET_AUDIO_PLAYER});

export function* watchAudioPlayer() {}