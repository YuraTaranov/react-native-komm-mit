import React from 'react';
import {connect} from 'react-redux';
import {useCallback, useMemo, useTranslation} from '@hooks';
import {View, Text, Icon, TouchableOpacity} from '@components';
import styles from './styles';
import {TGlobalState} from '@types';
import {colors, Languages} from '@constants';
import {navigate} from '@services';

type TProps = {
  lang: Languages;
  cityName: string;
};

const Settings: React.FC<TProps> = ({lang, cityName}) => {
  const {t} = useTranslation();

  const navigateToLang = useCallback(() => {
    navigate('LanguagesListNavigator');
  }, []);

  const navigateToCity = useCallback(() => {
    navigate('ChangeCityNavigator');
  }, []);

  const langValue = useMemo(() => {
    if (lang === Languages.RU) {
      return 'Русский';
    }
    if (lang === Languages.UK) {
      return 'Українська';
    }
    if (lang === Languages.EN) {
      return 'English';
    }
    if (lang === Languages.DE) {
      return 'Deutsch';
    }
  }, [lang]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.langContainer} onPress={navigateToLang}>
        <View style={styles.langTitleContainer}>
          <Icon name="lang" size={24} color={colors.silverChalice_A0A0A0} />
          <Text style={styles.langTitle}>{t('Язык')}</Text>
        </View>
        <View style={styles.langValueContainer}>
          <Text style={styles.langValue}>{langValue}</Text>
          <Icon name="arrow-right" size={16} color={colors.silverChalice_A0A0A0} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.langContainer} onPress={navigateToCity}>
        <View style={styles.langTitleContainer}>
          <Icon name="pin" size={24} color={colors.silverChalice_A0A0A0} />
          <Text style={styles.langTitle}>{t('Город')}</Text>
        </View>
        <View style={styles.langValueContainer}>
          <Text style={styles.langValue}>{cityName}</Text>
          <Icon name="arrow-right" size={16} color={colors.silverChalice_A0A0A0} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToPros = (state: TGlobalState) => ({
  lang: state.global.lang,
  cityName: state.global.city.name,
});

export default connect(mapStateToPros)(Settings);
