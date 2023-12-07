import React from 'react';
import {View, Text, Button, Image} from '@components';
import styles from './styles';
import {assets} from '@assets';
import {useTranslation} from 'react-i18next';
import {useCallback} from '@hooks';
import {navigate} from '@services';

type TProps = {};

const Onboarding: React.FC<TProps> = ({}) => {
  const {t} = useTranslation();

  const onPress = useCallback(() => {
    navigate('ConfirmLocation');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={assets.onboarding} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{t('Интерактивный путеводитель по немецким местам Украины')}</Text>
        <Text style={styles.subtitle}>
          {t(
            'Выбирайте город или село, смотрите видео, находите следы немецкой истории в Украине и слушайте авторские экскурсии',
          )}
        </Text>
      </View>
      <Button title={t('Начать')} onPress={onPress} />
    </View>
  );
};

export default Onboarding;
