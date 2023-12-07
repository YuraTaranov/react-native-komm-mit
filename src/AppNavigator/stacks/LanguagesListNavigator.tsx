import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LanguagesList} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from '../options';
import {HeaderBackButton} from '@components';

const LanguagesListStack = createStackNavigator();

const LanguagesListNavigator: React.FC = () => {
  const {t} = useTranslation();

  return (
    <LanguagesListStack.Navigator
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <LanguagesListStack.Screen
        name="LanguagesList"
        component={LanguagesList}
        options={{
          headerTitle: t('Язык'),
          headerLeft: () => <HeaderBackButton />,
        }}
      />
    </LanguagesListStack.Navigator>
  );
};

export default LanguagesListNavigator;
