import React from 'react';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, Image, TouchableOpacity} from '@components';
import styles from './styles';
import {assets} from '@assets';
import {goBack} from '@services';
import {connect} from 'react-redux';
import {getRoutes} from '@reducers/routes';
import {Dispatch} from 'redux';
import {IGetRoutes} from 'src/types/actions/routes';
import {IGetObjects} from 'src/types/actions/objects';
import {getObjects} from '@reducers/objects';
import {TCity} from '@types';

type TProps = {
  getRoutes: (cityId: string) => void;
  getObjects: (cityId: string) => void;
  city: TCity;
};

const NoInternetModal: React.FC<TProps> = ({getRoutes, getObjects, city}) => {
  const {t} = useTranslation();

  const onPress = useCallback(() => {
    goBack();
    getRoutes(city.id);
    getObjects(city.id);
  }, [city]);

  return (
    <View style={styles.container}>
      <Image source={assets.error_404} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{t('Ошибка')}</Text>
      <Text style={styles.description}>{t('Страница, которую вы ищете, не найденa')}</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={styles.buttonText}>{t('Назад')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: any) => ({
  city: state.global.city,
});

const mapDispatchToProps = (dispatch: Dispatch<IGetRoutes | IGetObjects>) => ({
  getRoutes: (cityId: string) => dispatch(getRoutes(cityId)),
  getObjects: (cityId: string) => dispatch(getObjects(cityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NoInternetModal);
