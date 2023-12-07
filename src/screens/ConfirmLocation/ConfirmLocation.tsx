import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useTranslation} from '@hooks';
import {View, Text, ImageBackground, Icon, DropShadow, TouchableOpacity, UseMyLocation} from '@components';
import {ISetCity, ISetFirstOpenApp, TCity, TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {setCity, setFirstOpenApp} from '@reducers/global';
import {assets} from '@assets';
import {colors} from '@constants';
import {navigate} from '@services';

type TProps = {
  setFirstOpenApp: (arg: boolean) => void;
  cities: TCity[];
  setCity: (city: TCity) => void;
};

const ConfirmLocation: React.FC<TProps> = ({setFirstOpenApp, cities, setCity}) => {
  const {t} = useTranslation();

  const onPressClose = useCallback(() => {
    setFirstOpenApp(false);
    // FIXME: default city (Kyiv)
    // cities.length && setCity(cities[0]);
  }, [cities]);

  const onPressSearch = useCallback(() => {
    navigate('SearchCityNavigator');
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground source={assets.confirm_location_bg} style={styles.imageBackground}>
        <TouchableOpacity style={styles.closeContainer} onPress={onPressClose}>
          <Icon size={24} name="close" color={colors.silverChalice_A0A0A0} />
        </TouchableOpacity>
        <View style={styles.bottomSheet}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
          <Text style={styles.title}>{t('Подтвердите местоположение')}</Text>
          <DropShadow onTouchStart={onPressSearch} style={styles.shadow}>
            <View style={styles.searchContainer}>
              <Icon name="search" size={24} color={colors.black_1D2438} />
              <Text style={styles.searchText}>{t('Поиск города или области')}</Text>
            </View>
          </DropShadow>
          <UseMyLocation cities={cities} />
        </View>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  cities: state.localities.cities,
});

const mapDispatchToProps = (dispatch: Dispatch<ISetFirstOpenApp | ISetCity>) => ({
  setFirstOpenApp: (arg: boolean) => dispatch(setFirstOpenApp(arg)),
  setCity: (city: TGlobalState['global']['city']) => dispatch(setCity(city)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmLocation);
