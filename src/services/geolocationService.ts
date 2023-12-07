import { Alert, Geolocation, PERMISSIONS, PermissionsRequest, PermissionsResults, Linking } from "@components";
import { device } from "@constants";
import { setLoading } from "@reducers/additional";
import { setFirstOpenApp } from "@reducers/global";
import { setUserGeolocation } from "@reducers/userGeolocation";
import { TCity, TGlobalState } from "@types";
import i18next from "i18next";
import { getCityFromCoordinates } from "../screens/Routes/utils/getCityFromCoordinates";
import storage from '../store';

type TPermissionStatus = 'unavailable' | 'denied' | 'limited' | 'granted' | 'blocked';
type TUserGeolocation = TGlobalState['userGeolocation'];

const dispatchGeolocation = (geolocation: TUserGeolocation) => storage?.store?.dispatch(setUserGeolocation(geolocation))
const dispatchFirstOpenAppFalse = () => storage?.store?.dispatch(setFirstOpenApp(false))
const dispatchLoading = (arg: boolean) => storage?.store?.dispatch(setLoading(arg))

const handlePermissionsStatus = (status: TPermissionStatus, needSetUserLocation: boolean, cities: TCity[]) => {
	if (status === PermissionsResults.GRANTED) {
		Geolocation.getCurrentPosition(
		  (position: Geolocation.GeoPosition) => {
			if (needSetUserLocation) {
				const userLocation = {latitude: position.coords.latitude, longitude: position.coords.longitude}
				dispatchGeolocation(userLocation)
				getCityFromCoordinates(userLocation, cities)
			}
			dispatchFirstOpenAppFalse()
			dispatchLoading(false)
		  },
		  error => {
			dispatchLoading(false)
			console.log('getCurrentPosition error', error);
			Alert.alert('', i18next.t('Геолокация недоступна, проверьте подключение к Интернету и к службам геолокации'));
		  },
		  {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
		);
	  } else if (status === PermissionsResults.BLOCKED) {
		dispatchLoading(false)
		Alert.alert(
		  '',
		  i18next.t(
			'Вы отключили геолокацию для Komm mit, это может привести к ограничению основных возможностей приложения, рекомендуем включить геолокацию, хотите перейти в настройки сейчас?',
		  ),
		  [
			{
			  text: i18next.t('Да, хочу'),
			  onPress: () => Linking.openSettings(),
			  style: 'cancel',
			},
			{text: i18next.t('Не сейчас'), onPress: () => {}, style: 'destructive'},
		  ],
		);
	  } else if (status === PermissionsResults.UNAVAILABLE) {
		dispatchLoading(false)
		Alert.alert(i18next.t('Геолокация недоступна на этом устройстве'));
	  } else if (status === PermissionsResults.DENIED) {
		dispatchLoading(false)
	  }
}

export const geolocationRequest = async (needSetUserLocation: boolean = false, cities: TCity[] = []) => {
	dispatchLoading(true)
	try {
		if (device.isIos) {
		  const LOCATION_WHEN_IN_USE_REQUEST = await PermissionsRequest(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
		  handlePermissionsStatus(LOCATION_WHEN_IN_USE_REQUEST, needSetUserLocation, cities)
		} else {
		  const ACCESS_FINE_LOCATION_REQUEST = await PermissionsRequest(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
		  handlePermissionsStatus(ACCESS_FINE_LOCATION_REQUEST, needSetUserLocation, cities)
		}
	  } catch (error) {
		dispatchLoading(false)
		console.log('geolocationRequest error', error);
	  } 
}