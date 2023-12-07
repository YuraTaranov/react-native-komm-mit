import { urls } from "@constants";
import { httpGet } from "../../http";
import { IGetObjectsResponse } from "./types";

export class ObjectsService {
	public async getObjects(cityId: string): Promise<IGetObjectsResponse> {
		return await httpGet(`${urls.cities}/${cityId}/objects`)
	}
}

export default new ObjectsService();