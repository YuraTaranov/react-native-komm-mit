import {TGlobalState, TScreenNavigationType} from '@types';

type TRouteDetailed = TGlobalState['routeDetailed'];

interface IRouteDetailedControllerActions {
	GET_ROUTE_DETAILED: string;
	SET_ROUTE_OBJECTS_IDS: string;
	SET_ROUTE_COLOR: string;
}

export interface ISetRouteObjectsIds {
  type: IRouteDetailedControllerActions['SET_ROUTE_OBJECTS_IDS'];
  data: TRouteDetailed['routeObjectsIds'];
}
export interface ISetRouteColor {
	type: IRouteDetailedControllerActions['SET_ROUTE_COLOR'];
	data: TRouteDetailed['routeColor'];
}
export interface IGetRouteDetailed {
  type: IRouteDetailedControllerActions['GET_ROUTE_DETAILED'];
  id: string;
  navigationType: TScreenNavigationType;
}

