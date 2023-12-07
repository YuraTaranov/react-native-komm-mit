import {TGlobalState} from '@types';

type TRoutes = TGlobalState['routes'];

interface IRoutesControllerActions {
	GET_ROUTES: string;
	SET_ROUTES: string;
}

export interface IGetRoutes {
	type: IRoutesControllerActions['GET_ROUTES'];
	data: string;
  }

export interface ISetRoutes {
  type: IRoutesControllerActions['SET_ROUTES'];
  data: TRoutes['data'];
}
