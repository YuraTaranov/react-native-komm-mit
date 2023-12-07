import React from 'react';
import {Dispatch} from 'redux';
import {useCallback} from '@hooks';
import {View, Text, TouchableOpacity} from '@components';
import {TGlobalState, TSetLang} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import {Languages} from '@constants';
import {setLang} from '@reducers/global';
import {getRoutes} from '@reducers/routes';
import {getObjects} from '@reducers/objects';
import {getCities} from '@reducers/localities';
import {IGetRoutes} from 'src/types/actions/routes';
import {IGetRouteDetailed} from 'src/types/actions/routeDetailed';
import {IGetObjects} from 'src/types/actions/objects';
import {goBack} from '@services';

type TProps = {
  lang: Languages;
  setLang: (lang: Languages) => void;
  getRoutes: (cityId: string) => void;
  getObjects: (cityId: string) => void;
  getCities: () => void;
  cityId: string;
};

const LanguagesList: React.FC<TProps> = ({lang, setLang, getRoutes, getObjects, getCities, cityId}) => {
  const onPressLang = useCallback(
    (language: Languages) => () => {
      setLang(language);
      goBack();
      //   getRoutes(cityId);
      //   getObjects(cityId);
      //   getCities();
    },
    [],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.itemContainer, lang === Languages.DE && styles.activeItemContainer]}
        onPress={onPressLang(Languages.DE)}>
        <Text style={[styles.itemText, lang === Languages.DE && styles.activeItemText]}>Deutsch</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.itemContainer, lang === Languages.EN && styles.activeItemContainer]}
        onPress={onPressLang(Languages.EN)}>
        <Text style={[styles.itemText, lang === Languages.EN && styles.activeItemText]}>English</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.itemContainer, lang === Languages.RU && styles.activeItemContainer]}
        onPress={onPressLang(Languages.RU)}>
        <Text style={[styles.itemText, lang === Languages.RU && styles.activeItemText]}>Русский</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.itemContainer, lang === Languages.UK && styles.activeItemContainer]}
        onPress={onPressLang(Languages.UK)}>
        <Text style={[styles.itemText, lang === Languages.UK && styles.activeItemText]}>Українська</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  lang: state.global.lang,
  cityId: state.global.city.id,
});

const mapDispatchToProps = (dispatch: Dispatch<TSetLang | IGetRoutes | IGetRouteDetailed | IGetObjects>) => ({
  setLang: (lang: Languages) => dispatch(setLang(lang)),
  getRoutes: (cityId: string) => dispatch(getRoutes(cityId)),
  getObjects: (cityId: string) => dispatch(getObjects(cityId)),
  getCities: () => dispatch(getCities()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesList);
