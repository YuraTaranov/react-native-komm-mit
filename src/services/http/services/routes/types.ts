import {IFormatResponse, TRoute} from '@types';

export interface IGetRoutesAction {
	type: string;
	data: string;
}

export interface IGetRoutesResponse extends IFormatResponse {
  data: {
	  data: {
	 	 guides: TRoute[];
	  }
  }
}