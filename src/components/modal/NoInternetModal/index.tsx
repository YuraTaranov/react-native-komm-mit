import React from 'react';
import {useCallback, useEffect, useState, useTranslation} from '@hooks';
import {View, Text, Image, Modal, TouchableOpacity, NetInfo} from '@components';
import styles from './styles';
import {assets} from '@assets';
import {ActivityIndicator} from 'react-native';
import {colors} from '@constants';

type TProps = {};

const NoInternetModal: React.FC<TProps> = ({children}) => {
  const {t} = useTranslation();
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected || false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const onPress = useCallback(() => {
    setIsLoading(true);
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected || false);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      {children}
      <Modal isVisible={!isConnected} style={styles.modalContainer} backdropTransitionOutTiming={0}>
        <Image source={assets.no_internet} style={styles.image} resizeMode="contain" />
        <Text style={styles.title}>{t('Нет подключения к сети')}</Text>
        <Text style={styles.description}>
          {t('Нет соединения с интернетом. Подключитесь к Интернету и попробуйте еще раз')}
        </Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
          {!isLoading ? (
            <Text style={styles.buttonText}>{t('Обновить')}</Text>
          ) : (
            <ActivityIndicator size="large" color={colors.dodgerBlue_4D91FB} />
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NoInternetModal;
