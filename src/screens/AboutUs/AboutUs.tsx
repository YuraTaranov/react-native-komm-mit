import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {useState, useEffect, useCallback, useMemo, useTranslation, useRoute} from '@hooks';
import {View, Text, Image, ScrollView, VideoPlayer} from '@components';
import styles from './styles';
import {AboutUsRouteProp, TGlobalState} from '@types';

type TProps = {
  isPlayerVisible: boolean;
};

const AboutUs: React.FC<TProps> = ({isPlayerVisible}) => {
  const {t} = useTranslation();
  const {params} = useRoute<AboutUsRouteProp>();

  const data = {
    mainImage: 'https://izvestia.kharkov.ua/wp-content/uploads/2021/05/e89ae892b13dc941cf8c71d801a6ecbd.jpg',
    title1: t('Совет немцев Украины'),
    description1: t(
      'Совет немцев Украины – это главный координирующий орган, представляющий интересы этнических немцев в Украине. Организация занимается культурными, языковыми, образовательными, молодежными и социальными проектами, а также развивает партнерство между Украиной и Германией.',
    ),
    title2: t('Приложение “Komm mit!”'),
    description2: t(
      'Цель этого приложения – показать большое культурное наследие немцев, которые проживали в Украине  и популяризировать немецкую историю и культуру в Украине. Используйте встроенную карту, чтобы узнать интересные факты о немецких колониях, городах, исторических сооружениях и многочисленных местах, связанных с немецкими художниками, писателями, музыкантами и т.д.\n\nДля каждой локации доступны информационные, графические и видеоматериалы, а также аудиогиды на украинском, немецком и русском языках. Кроме того, вы найдете видеотуры по бывшим немецкими колониями и городами, такими, как Одесса, Харьков, Львов или Луцк, записанные местными гидами.',
    ),
    image: 'https://vgorode.ua/img/article/2613/83_main-v1566339698.jpg',
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{uri: data.mainImage}} style={styles.imageMain} />
      <Text style={styles.title}>{data.title1}</Text>
      <Text style={styles.description}>{data.description1}</Text>
      <VideoPlayer containerStyle={styles.videoContainer} video={'lAyWhJ6tr9E'} />
      <Text style={styles.title}>{data.title2}</Text>
      <Text style={styles.description}>{data.description2}</Text>
      <Image source={{uri: data.image}} style={{...styles.image, marginBottom: isPlayerVisible ? 100 : 40}} />
    </ScrollView>
  );
};

const mapStateToPros = (state: TGlobalState) => ({
  isPlayerVisible: state.audioPlayer.playerVisible,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToPros, mapDispatchToProps)(AboutUs);
