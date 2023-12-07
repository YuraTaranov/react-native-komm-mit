import React from 'react';
import {Dispatch} from 'redux';
import {useCallback, useMemo, useTranslation, useRef, useRoute, useEffect} from '@hooks';
import {
  View,
  Text,
  BottomSheet,
  BottomSheetScrollView,
  Icon,
  VideoPlayer,
  DropShadow,
  TrackPlayer,
  Image,
  TouchableOpacity,
} from '@components';
import {ObjectDetailedRouteProp, TGlobalState, TObject, TScreenNavigationType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import ObjectCarousel from './components/ObjectCarousel/ObjectCarousel';
import {Languages, bottom, colors, device} from '@constants';
import {IGetObjectDetailed} from 'src/types/actions/objectDetailed';
import {getObjectDetailed} from '@reducers/objectDetailed';
import {setIsPlaying, setPlayerVisible} from '@reducers/audioPlayer';
import {ISetPlayerVisible} from 'src/services/http/services/audioPlayer/types';
import {assets} from '@assets';
import {mapServerLangToAppLang} from '@helpers';

type TProps = {
  objectData: TObject;
  routeObjectsIds: string[];
  getObjectDetailed: (
    id: string,
    navigationType: TScreenNavigationType,
    isNeedToSwitchTrack: boolean,
  ) => IGetObjectDetailed;
  routeColor: string;
  setPlayerVisible: (arg: boolean) => void;
  setIsPlaying: (arg: boolean) => void;
  isPlayerVisible: boolean;
  lang: Languages;
};

const ObjectDetailed: React.FC<TProps> = ({
  objectData,
  routeObjectsIds,
  getObjectDetailed,
  routeColor,
  setPlayerVisible,
  setIsPlaying,
  isPlayerVisible,
  lang,
}) => {
  const {t} = useTranslation();
  const bottomSheetRef = useRef<any>(null);
  const {params} = useRoute<ObjectDetailedRouteProp>();

  useEffect(() => {
    if (params?.isNeedToSwitchTrack && tracks.length) {
      openPlayer();
    } else if (!tracks.length && params?.isNeedToSwitchTrack) {
      setIsPlaying(false);
      setPlayerVisible(false);
      TrackPlayer.reset();
    }
  }, [params?.isNeedToSwitchTrack, tracks]);

  const filterLang = useCallback(
    audio => {
      const audioLang = mapServerLangToAppLang(audio.lang);
      return audioLang === lang;
    },
    [lang],
  );

  const filteredAudios = objectData.audio.length ? objectData.audio.filter(filterLang) : [];

  const tracks = useMemo(() => {
    if (filteredAudios.length) {
      return filteredAudios.map(track => ({
        id: track.id,
        url: track.path,
        title: track.title,
        artist: track.description,
      }));
    } else {
      return [];
    }
  }, [objectData.audio]);

  const openPlayer = useCallback(() => {
    TrackPlayer.reset();
    TrackPlayer.add(tracks);
    TrackPlayer.seekTo(0);
    setPlayerVisible(true);
    setIsPlaying(false);
  }, [tracks]);

  const findActiveIndex: number = useMemo(() => routeObjectsIds.findIndex(i => i === objectData.id), [objectData.id]);
  const prevItemId: string | false = findActiveIndex !== -1 && routeObjectsIds[findActiveIndex - 1];
  const nextItemId: string | false = findActiveIndex !== -1 && routeObjectsIds[findActiveIndex + 1];

  const onPressPrevObject = useCallback(() => {
    if (prevItemId) {
      if (isPlayerVisible) {
        setIsPlaying(false);
        TrackPlayer.reset();
        getObjectDetailed(prevItemId, 'replace', true);
      } else {
        getObjectDetailed(prevItemId, 'replace', false);
      }
    }
  }, [prevItemId, isPlayerVisible]);

  const onPressNextObject = useCallback(() => {
    if (nextItemId) {
      if (isPlayerVisible) {
        setIsPlaying(false);
        TrackPlayer.reset();
        getObjectDetailed(nextItemId, 'replace', true);
      } else {
        getObjectDetailed(nextItemId, 'replace', false);
      }
    }
  }, [nextItemId, isPlayerVisible]);

  const buttons = useMemo(() => {
    if (!prevItemId && nextItemId) {
      return (
        <DropShadow style={styles.buttonShadow}>
          <TouchableOpacity style={styles.buttonFullNextContainer} onPress={onPressNextObject}>
            <Text style={styles.buttonTextNext}>{t('Следующий объект')}</Text>
          </TouchableOpacity>
        </DropShadow>
      );
    }
    if (!nextItemId && prevItemId) {
      return (
        <TouchableOpacity style={styles.buttonFullPrevContainer} onPress={onPressPrevObject}>
          <Text style={styles.buttonTextPrev}>{t('Предыдущий объект')}</Text>
        </TouchableOpacity>
      );
    }
    if (prevItemId && nextItemId) {
      return (
        <View style={styles.buttonsHalfContainer}>
          <TouchableOpacity style={styles.buttonPrev} onPress={onPressPrevObject}>
            <Text style={styles.buttonTextPrev}>{t('Предыдущий')}</Text>
          </TouchableOpacity>
          <DropShadow style={styles.buttonShadow}>
            <TouchableOpacity style={styles.buttonNext} onPress={onPressNextObject}>
              <Text style={styles.buttonTextNext}>{t('Следующий')}</Text>
            </TouchableOpacity>
          </DropShadow>
        </View>
      );
    }
  }, [prevItemId, nextItemId, isPlayerVisible]);

  return (
    <View style={styles.container}>
      <ObjectCarousel data={objectData.images} />
      <BottomSheet bottomSheetRef={bottomSheetRef}>
        <BottomSheetScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{objectData.title}</Text>
              {routeColor ? (
                <DropShadow style={styles.objectNumberShadowView}>
                  <View style={styles.objectNumberShadowContainer}>
                    <View style={{...styles.objectNumberContainer, backgroundColor: routeColor}}>
                      <Text style={styles.objectNumber}>{objectData.order}</Text>
                    </View>
                  </View>
                </DropShadow>
              ) : null}
            </View>
            <View style={styles.itemAddressContainer}>
              <Icon name="pin" size={14} color={colors.black_1D2438} />
              <Text style={styles.itemAddress}>{objectData.location.address}</Text>
            </View>
            <View style={styles.aboutObjectContainer}>
              <View>
                <Text style={styles.aboutObjectTitle}>{t('Про объект')}</Text>
                <Text style={styles.aboutObject}>{objectData.description}</Text>
              </View>
              {tracks.length ? (
                <TouchableOpacity onPress={openPlayer}>
                  <Image source={assets.headphones} style={styles.headphones} resizeMode="contain" />
                </TouchableOpacity>
              ) : null}
            </View>
            {/* {objectData.video ? <VideoPlayer video={objectData.video} /> : null} */}
            <View
              style={{
                ...styles.buttonsContainer,
                marginBottom: isPlayerVisible ? (device.isIos && bottom ? 120 : 80) : 10,
              }}>
              {buttons}
            </View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  routeObjectsIds: state.routeDetailed.routeObjectsIds,
  objectData: state.objectDetailed,
  routeColor: state.routeDetailed.routeColor,
  isPlayerVisible: state.audioPlayer.playerVisible,
  lang: state.global.lang,
});

const mapDispatchToProps = (dispatch: Dispatch<IGetObjectDetailed | ISetPlayerVisible>) => ({
  getObjectDetailed: (id: string, navigationType: TScreenNavigationTypeд, isNeedToSwitchTrack: boolean) =>
    dispatch(getObjectDetailed(id, navigationType, isNeedToSwitchTrack)),
  setPlayerVisible: (arg: boolean) => dispatch(setPlayerVisible(arg)),
  setIsPlaying: (arg: boolean) => dispatch(setIsPlaying(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetailed);
