import React from 'react';
import {useTranslation, useMemo, useState, useCallback} from '@hooks';
import {
  View,
  Text,
  DropShadow,
  Icon,
  TextInput,
  UseMyLocation,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  createFilter,
} from '@components';
import {TCity, TGlobalState} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {colors, hitSlop} from '@constants';

const KEYS_TO_FILTERS = ['name'];

type TProps = {
  onPressCity: (city: TCity) => () => void;
  cityId: string;
  cities: TCity[];
  localities: TGlobalState['localities'];
  onPressUseMyLocation?: () => void;
  isLoading: boolean;
};

const LocalitiesList: React.FC<TProps> = ({
  onPressCity,
  cityId,
  localities,
  onPressUseMyLocation,
  isLoading,
  cities,
}) => {
  const {t} = useTranslation();
  const [searchInput, setSearchInput] = useState<string>('');

  const clearInput = useCallback(() => {
    setSearchInput('');
  }, []);

  const data = useMemo(() => {
    return [...localities.cities, ...localities.districts].filter(createFilter(searchInput, KEYS_TO_FILTERS));
  }, [localities, searchInput]);

  return (
    <SafeAreaView style={styles.container}>
      <DropShadow style={styles.shadow}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={colors.black_1D2438} />
          <TextInput
            placeholder={t('Поиск города или области')}
            placeholderTextColor={colors.silverChalice_A0A0A0}
            value={searchInput}
            onChangeText={setSearchInput}
            style={styles.input}
          />
          {searchInput ? (
            <TouchableOpacity hitSlop={hitSlop} onPress={clearInput}>
              <Icon name="close" size={16} color={colors.grey_828282} />
            </TouchableOpacity>
          ) : null}
        </View>
      </DropShadow>
      <View style={styles.useMyLocationContainer}>
        <UseMyLocation onPressUseMyLocation={onPressUseMyLocation} cities={cities} />
      </View>
      <ScrollView
        style={styles.citiesContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {data.length ? (
          data.map(city => (
            <TouchableOpacity
              key={city.id}
              style={[styles.cityNameContainer, city.id === cityId && styles.cityNameContainerActive]}
              onPress={onPressCity(city)}>
              <Text style={styles.cityName}>{city.name}</Text>
            </TouchableOpacity>
          ))
        ) : isLoading ? (
          <ActivityIndicator size="large" color={colors.dodgerBlue_4D91FB} />
        ) : (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>{t('Города или области не найдены')}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  cityId: state.global.city.id,
  cities: state.localities.cities,
  localities: state.localities,
  isLoading: state.localities.isLoading,
  firstOpenApp: state.global.firstOpenApp,
});

export default connect(mapStateToProps)(LocalitiesList);
