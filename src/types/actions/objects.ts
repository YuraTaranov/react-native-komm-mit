import {TGlobalState} from '@types';

type TObjects = TGlobalState['objects'];

interface IObjectsControllerActions {
	GET_OBJECTS: string;
	SET_OBJECTS: string;
}

export interface IGetObjects {
	type: IObjectsControllerActions['GET_OBJECTS'];
  }

export interface ISetObjects {
  type: IObjectsControllerActions['SET_OBJECTS'];
  data: TObjects['data'];
}
