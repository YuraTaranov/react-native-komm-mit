import React from 'react';
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '@components';
import {Routes, Objects, AboutUs, Settings} from '@screens';
import {useTranslation} from '@hooks';
import {defaultStackOptions} from './options';

const TabStack = createBottomTabNavigator();
type TProps = {};

const TabNavigator: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  const renderTab = (props: BottomTabBarProps) => <TabBar {...props} />;

  return (
    <TabStack.Navigator
      initialRouteName={'Routes'}
      tabBar={renderTab}
      screenOptions={{
        ...defaultStackOptions,
      }}>
      <TabStack.Screen name={'Routes'} component={Routes} options={{headerShown: false}} />
      <TabStack.Screen name={'Objects'} component={Objects} options={{headerShown: false}} />
      <TabStack.Screen
        name={'AboutUs'}
        component={AboutUs}
        options={{
          headerTitle: t('О нас'),
        }}
      />
      <TabStack.Screen
        name={'Settings'}
        component={Settings}
        options={{
          headerTitle: t('Настройки'),
        }}
      />
    </TabStack.Navigator>
  );
};

export default TabNavigator;
