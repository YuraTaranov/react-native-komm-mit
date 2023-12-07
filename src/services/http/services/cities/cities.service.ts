import { urls } from "@constants";
import { httpGet } from "../../http";
import { IGetCitiesResponse } from "./types";

export class CitiesService {
	public async getCities(): Promise<IGetCitiesResponse> {
		return await httpGet(urls.cities)
	}
}

export default new CitiesService();