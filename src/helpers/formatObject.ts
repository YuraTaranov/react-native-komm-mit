export const formatObject = (obj: any) => {
	return  {
		...obj,
		location: {
			...obj.location,
			coordinates: {
				latitude: +obj.location.coordinates.lat,
				longitude: +obj.location.coordinates.lng,
		}
	}
	}
} 