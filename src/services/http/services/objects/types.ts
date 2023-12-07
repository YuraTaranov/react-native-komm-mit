import {IFormatResponse, TObject} from '@types';

export interface IGetObjectsAction {
	type: string;
	data: string;
}

export interface IGetObjectsResponse extends IFormatResponse {
  data: {
	  data: {
	 	 objects: TObject[];
	  }
  }
}