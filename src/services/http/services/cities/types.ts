import {IFormatResponse, TCity} from '@types';

export interface IGetCitiesResponse extends IFormatResponse {
  data: {
	  data: {
	 	 cities: TCity[];
	  }
  }
}