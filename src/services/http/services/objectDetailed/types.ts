import {IFormatResponse, TObject} from '@types';

export interface IGetObjectDetailedAction {
	type: string;
	data: string;
}

export interface IGetObjectDetailedResponse extends IFormatResponse {
  data: {
	  data: {
	 	 object: TObject;
	  }
  }
}