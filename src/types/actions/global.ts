import {Languages} from '@constants';
import { TGlobalState } from '@types';

type TGlobal = TGlobalState['global'];

export type TSetLang = {
	type: string;
	data: Languages;
}
interface IGlobalControllerActions {
	SET_FIRST_OPEN_APP: string;
	SET_CITY: string;
	INITIAL: string;
}
export interface ISetFirstOpenApp {
  type: IGlobalControllerActions['SET_FIRST_OPEN_APP'];
  data: TGlobal['firstOpenApp'];
}
export interface ISetCity {
  type: IGlobalControllerActions['SET_CITY'];
  data: TGlobal['city'];
}
export interface IInitial {
	type: IGlobalControllerActions['INITIAL'];
  }