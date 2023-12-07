import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, TouchableOpacity, Icon, Keyboard} from '@components';
import styles from './styles';
import {colors} from '@constants';
import {geolocationRequest} from '@services';
import {TCity} from '@types';

type TProps = {
  onPressUseMyLocation?: () => void;
  cities: TCity[];
};

const UseMyLocation: React.FC<TProps> = ({onPressUseMyLocation, cities}) => {
  const {t} = useTranslation();

  const useMyLocation = useCallback(async () => {
    Keyboard.dismiss();
    geolocationRequest(true, cities);
    onPressUseMyLocation && onPressUseMyLocation();
  }, [onPressUseMyLocation, cities]);

  return (
    <TouchableOpacity style={styles.useMyLocationContainer} onPress={useMyLocation}>
      <View style={styles.geoIconContainer}>
        <Icon size={24} color={colors.black_1D2438} name="pin" />
      </View>
      <Text style={styles.useMyLocationText}>{t('Использовать текущее местоположение')}</Text>
    </TouchableOpacity>
  );
};

export default UseMyLocation;
