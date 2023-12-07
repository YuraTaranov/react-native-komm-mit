import {TScreenNavigationType} from '@types';

interface IObjectDetailedControllerActions {
  GET_OBJECT_DETAILED: string;
}

export interface IGetObjectDetailed {
  type: IObjectDetailedControllerActions['GET_OBJECT_DETAILED'];
  id: string;
  navigationType: TScreenNavigationType;
  isNeedToSwitchTrack?: boolean;
}
