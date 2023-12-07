import { Alert, Geocoder } from "@components";
import { setCity } from "@reducers/global";
import { TGlobalState } from "@types";
import i18next from "i18next";
import storage from '../../../store';

type TCity = TGlobalState['global']['city']
type TUserGeolocation = TGlobalState['userGeolocation']
type TCities = TGlobalState['localities']['cities']
type TAddressComponents = {
    long_name: string;
    short_name: string;
    types: string[];
}

const dispatchSetCity = (arg: TCity) => storage?.store?.dispatch(setCity(arg))

const customAlert = () => Alert.alert('', i18next.t('При поиске города по вашим координатам произошла ошибка. Попробуйте позже или выберите город вручную в настройках приложения'));

export const getCityFromCoordinates = (userGeolocation: TUserGeolocation, cities: TCities) => {
	const dispatchDefaultCity = () => {
		cities.length && dispatchSetCity(cities[0])
	}

	Geocoder.from(userGeolocation.latitude, userGeolocation.longitude)
      .then((json: Geocoder.GeocoderResponse) => {
		const foundCities = json.results
			.map(city => city.address_components
			.filter((i: TAddressComponents) => i.types[0] === 'locality'))
		    // @ts-ignore flat
			.flat()
			.map((i: TAddressComponents) => i.long_name)

		if (foundCities.length) {
			const findCity: TCity | undefined = cities.length ? cities.find(item => foundCities.includes(item.name)) : undefined
			if (findCity) { 
				dispatchSetCity(findCity)
				return
			} else {
				dispatchDefaultCity()
				return Alert.alert('', i18next.t('К сожалению, маршруты в вашем городе не найдены. Можете проверить список доступных городов с маршрутами в поиске или настройках приложения'));
			}
		} else {
			dispatchDefaultCity()
			return customAlert()
		}
      })
      .catch((error) => {
		dispatchDefaultCity()
		  console.log('geocoding error', error)
		  if (error.code !== 4) {
			return customAlert()
		  }
		})
}

// const cityData: TAddressComponents[] = json.results[0].address_components.filter((item: TAddressComponents) => item.types[0] === 'locality');
// const city: string = cityData[0]?.long_name;

// const districtData: TAddressComponents[] = json.results[0].address_components.filter((item: TAddressComponents) => item.types[0] === 'political');
// const district: string = districtData[0]?.long_name;

// const streetNameData: TAddressComponents[] = json.results[0].address_components.filter((item: TAddressComponents) => item.types[0] === 'route');
// const streetName: string = streetNameData[0]?.long_name;

// const streetNumberData: TAddressComponents[] = json.results[0].address_components.filter((item: TAddressComponents) => item.types[0] === 'street_number');
// const streetNumber: string = streetNumberData[0]?.long_name;

// const formattedAddress = json.results[0].formatted_address

// const reserveCityData: TAddressComponents[] = json.results[0].address_components.filter((item: TAddressComponents) => item.types[0] === 'postal_town');
// const reserveCity: string = reserveCityData[0]?.long_name;