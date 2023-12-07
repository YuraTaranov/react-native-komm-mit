import { urls } from "@constants";
import { httpGet } from "../../http";
import { IGetRoutesResponse } from "./types";

export class RoutesService {
	public async getRoutes(cityId: string): Promise<IGetRoutesResponse> {
		return await httpGet(`${urls.cities}/${cityId}/guides`)
	}
}

export default new RoutesService();