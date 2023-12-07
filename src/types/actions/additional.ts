import {TGlobalState} from '@types';

type TAdditional = TGlobalState['additional'];

interface IAdditionalControllerActions {
  SET_LOADING: string;
}

export interface ISetLoading {
  type: IAdditionalControllerActions['SET_LOADING'];
  data: TAdditional['loading'];
}
