import { urls } from "@constants";
import { httpGet } from "../../http";
import { IGetObjectDetailedResponse } from "./types";

export class ObjectDetailedService {
	public async getObjectDetailed(objectId: string): Promise<IGetObjectDetailedResponse> {
		return await httpGet(`${urls.objects}/${objectId}`)
	}
}

export default new ObjectDetailedService();