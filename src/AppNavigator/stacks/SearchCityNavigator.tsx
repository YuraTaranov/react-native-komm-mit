import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SearchCity} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';
import {HeaderBackButton} from '@components';

const SearchCityStack = createStackNavigator();

const SearchCityNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <SearchCityStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <SearchCityStack.Screen
        name="SearchCity"
        component={SearchCity}
        options={{
          headerTitle: t('Подтвердите местоположение'),
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </SearchCityStack.Navigator>
  );
};

export default SearchCityNavigator;
