import React, {Dispatch, useCallback} from 'react';
import TabNavigator from './TabNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {IInitial, ISetLoading, TGlobalState} from '@types';
import {navigationRef, onStateChange} from '@services';
import {AudioPlayer, Geocoder} from '@components';
import {ObjectDetailed, Onboarding, ConfirmLocation, Error404} from '@screens';
import {useEffect, useTranslation} from '@hooks';
import {device, GOOGLE_MAPS_APIKEY_ANDROID, GOOGLE_MAPS_APIKEY_IOS, Languages} from '@constants';
import RNBootSplash from 'react-native-bootsplash';
import SearchCityNavigator from './stacks/SearchCityNavigator';
import RouteDetailedNavigator from './stacks/RouteDetailedNavigator';
import LanguagesListNavigator from './stacks/LanguagesListNavigator';
import {initial} from '@reducers/global';
import ChangeCityNavigator from './stacks/ChangeCityNavigator';
import {setIsNeedBottomMargin} from '@reducers/audioPlayer';
import {getCities} from '@reducers/localities';
import {getRoutes} from '@reducers/routes';
import {getObjects} from '@reducers/objects';

type TProps = {
  firstOpenApp: boolean;
  lang: Languages;
  initial: () => void;
  cityName: string;
  setIsNeedBottomMargin: (arg: boolean) => void;
  cityId: string;
  getRoutes: (cityId: string) => void;
  getObjects: (cityId: string) => void;
  getCities: () => void;
};

const RootStack = createStackNavigator();

const AppNavigator: React.FC<TProps> = ({
  firstOpenApp,
  lang,
  initial,
  cityName,
  setIsNeedBottomMargin,
  cityId,
  getCities,
  getRoutes,
  getObjects,
}) => {
  Geocoder.init(device.isIos ? GOOGLE_MAPS_APIKEY_IOS : GOOGLE_MAPS_APIKEY_ANDROID, {language: lang});
  const {i18n} = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
    getCities();
    getRoutes(cityId);
    getObjects(cityId);
  }, [lang, cityId]);

  const onReady = useCallback(() => {
    initial();
    RNBootSplash.hide();
  }, []);

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={state => onStateChange(state, setIsNeedBottomMargin)}
        onReady={onReady}>
        <RootStack.Navigator screenOptions={{headerShown: false}}>
          {firstOpenApp ? (
            <>
              <RootStack.Screen name="Onboarding" component={Onboarding} />
              <RootStack.Screen name="ConfirmLocation" component={ConfirmLocation} />
              <RootStack.Screen name="SearchCityNavigator" component={SearchCityNavigator} />
            </>
          ) : (
            <>
              <RootStack.Screen name="TabNavigator" component={TabNavigator} />
              <RootStack.Screen name="RouteDetailedNavigator" component={RouteDetailedNavigator} />
              <RootStack.Screen name="ObjectDetailed" component={ObjectDetailed} options={{headerShown: false}} />
              <RootStack.Screen
                name="LanguagesListNavigator"
                component={LanguagesListNavigator}
                options={{
                  animationEnabled: true,
                }}
              />
              <RootStack.Screen name="ChangeCityNavigator" component={ChangeCityNavigator} />
              <RootStack.Screen name="Error404" component={Error404} options={{headerShown: false}} />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      <AudioPlayer cityName={cityName} />
    </>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  firstOpenApp: state.global.firstOpenApp,
  lang: state.global.lang,
  cityName: state.global.city.name,
  cityId: state.global.city.id,
});

const mapDispatchToProps = (dispatch: Dispatch<ISetLoading | IInitial>) => ({
  setIsNeedBottomMargin: (arg: boolean) => dispatch(setIsNeedBottomMargin(arg)),
  initial: () => dispatch(initial()),
  getCities: () => dispatch(getCities()),
  getRoutes: (cityId: string) => dispatch(getRoutes(cityId)),
  getObjects: (cityId: string) => dispatch(getObjects(cityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
