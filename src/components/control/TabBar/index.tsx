import React, {useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Text, SafeAreaView} from '@components';
import styles from './styles';
import {colors} from '@constants';
import {useTranslation} from '@hooks';

type TProps = {
  navigation: any;
  state: any;
};

const TabBar: React.FC<TProps> = ({navigation, state}) => {
  const {t} = useTranslation();

  const generalIndex: number = state?.index || 0;

  const jump = useCallback((routeName: string) => () => navigation.jumpTo(routeName), []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.tabContainer} onPress={jump('Routes')} disabled={generalIndex === 0}>
        <Icon name={'routes'} color={generalIndex === 0 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A} size={28} />
        <Text style={{...styles.tabText, color: generalIndex === 0 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A}}>
          {t('Маршруты')}
        </Text>
        {generalIndex === 0 ? <Text style={styles.underscore}>_</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabContainer} onPress={jump('Objects')} disabled={generalIndex === 1}>
        <Icon name={'objects'} color={generalIndex === 1 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A} size={28} />
        <Text style={{...styles.tabText, color: generalIndex === 1 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A}}>
          {t('Объекты')}
        </Text>
        {generalIndex === 1 ? <Text style={styles.underscore}>_</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabContainer} onPress={jump('AboutUs')} disabled={generalIndex === 2}>
        <Icon name={'about'} color={generalIndex === 2 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A} size={28} />
        <Text style={{...styles.tabText, color: generalIndex === 2 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A}}>
          {t('О нас')}
        </Text>
        {generalIndex === 2 ? <Text style={styles.underscore}>_</Text> : null}
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabContainer} onPress={jump('Settings')} disabled={generalIndex === 3}>
        <Icon name={'settings'} color={generalIndex === 3 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A} size={28} />
        <Text style={{...styles.tabText, color: generalIndex === 3 ? colors.dodgerBlue_4D91FB : colors.grey_9B9F9A}}>
          {t('Настройки')}
        </Text>
        {generalIndex === 3 ? <Text style={styles.underscore}>_</Text> : null}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TabBar;
