import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteDetailed} from '@screens';
import {useTranslation, useCallback} from '@hooks';
import {defaultStackOptions} from '../options';
import {HeaderBackButton} from '@components';
import {connect} from 'react-redux';
import {setRouteColor} from '@reducers/routeDetailed';
import {Dispatch} from 'redux';
import {ISetRouteColor} from 'src/types/actions/routeDetailed';
import {goBack} from '@services';

type TProps = {
  setRouteColor: (arg: string) => void;
};

const RouteDetailedStack = createStackNavigator();

const RouteDetailedNavigator: React.FC<TProps> = ({setRouteColor}) => {
  const {t} = useTranslation();

  const onPressBack = useCallback(() => {
    goBack();
    setRouteColor('');
  }, []);

  return (
    <RouteDetailedStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <RouteDetailedStack.Screen
        name="RouteDetailed"
        component={RouteDetailed}
        options={{
          headerTitle: t('Обзорный маршрут'),
          headerLeft: () => <HeaderBackButton onPress={onPressBack} />,
        }}
      />
    </RouteDetailedStack.Navigator>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ISetRouteColor>) => ({
  setRouteColor: (arg: string) => dispatch(setRouteColor(arg)),
});

export default connect(null, mapDispatchToProps)(RouteDetailedNavigator);
