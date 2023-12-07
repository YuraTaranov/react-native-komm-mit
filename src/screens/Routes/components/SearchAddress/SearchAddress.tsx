import React from 'react';
import {useTranslation, useCallback} from '@hooks';
import {View, Icon, TextInput, DropShadow} from '@components';
import styles from './styles';
import {colors} from '@constants';
import {navigate} from '@services';
import {TGlobalState} from '@types';

type TProps = {
  city: TGlobalState['global']['city'];
};

const SearchAddress: React.FC<TProps> = ({city}) => {
  const {t} = useTranslation();

  const navigateToChangeCity = useCallback(() => {
    navigate('ChangeCityNavigator');
  }, []);

  return (
    <DropShadow style={styles.shadow} onTouchStart={navigateToChangeCity}>
      <View style={styles.container}>
        <Icon name="search" size={24} color={colors.dodgerBlue_4D91FB} />
        <TextInput
          style={styles.input}
          editable={false}
          value={city.name}
          placeholder={t('Выберите город или область')}
        />
      </View>
    </DropShadow>
  );
};

export default SearchAddress;
