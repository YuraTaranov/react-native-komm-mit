import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChangeCity} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';
import {HeaderBackButton} from '@components';

const ChangeCityStack = createStackNavigator();

const ChangeCityNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <ChangeCityStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <ChangeCityStack.Screen
        name="ChangeCity"
        component={ChangeCity}
        options={{
          headerTitle: t('Выберите местоположение'),
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </ChangeCityStack.Navigator>
  );
};

export default ChangeCityNavigator;
