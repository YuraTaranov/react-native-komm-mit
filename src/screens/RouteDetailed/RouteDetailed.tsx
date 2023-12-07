import React from 'react';
import {useCallback, useTranslation, useRef, useState} from '@hooks';
import {View, BottomSheet, Button, BS, Text, TouchableOpacity, VideoPlayer, Icon} from '@components';
import {TGlobalState, TObject, TRoute, TScreenNavigationType} from '@types';
import {connect} from 'react-redux';
import styles from './styles';
import ObjectsList from './components/ObjectsList/ObjectsList';
import {getObjectDetailed} from '@reducers/objectDetailed';
import {Dispatch} from 'redux';
import {IGetObjectDetailed} from 'src/types/actions/objectDetailed';
import RouteDetailedMap from './components/RouteDetailedMap/RouteDetailedMap';
import {colors} from '@constants';

type TProps = {
  route: TRoute;
  routeObjects: TObject[];
  _getObjectDetailed: (id: string, navigationType: TScreenNavigationType) => void;
  city: TGlobalState['global']['city'];
  routeColor: string;
};

// test youtube video id YQEMIy6t_o4
const snapPoints = ['40%', '88%'];

const RouteDetailed: React.FC<TProps> = ({route, routeObjects, _getObjectDetailed, routeColor, city}) => {
  const {t} = useTranslation();
  const objectsListRef = useRef<any>(null);
  const bottomSheetRef = useRef<BS>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<string>();
  const [isVideoOpened, setIsVideoOpened] = useState(false);

  const scrollToIndex = useCallback((index: number) => {
    bottomSheetRef?.current?.expand();
    setTimeout(() => {
      objectsListRef?.current?.scrollToIndex({index});
    }, 500);
  }, []);

  const onPressStartRoute = useCallback(() => {
    routeObjects.length && _getObjectDetailed(routeObjects[0].id, 'navigate');
  }, [routeObjects]);

  const toggleVideo = useCallback(() => {
    setIsVideoOpened(prev => !prev);
  }, []);

  return (
    <View style={styles.container}>
      {routeObjects.length ? (
        <>
          <View style={styles.mapView}>
            <RouteDetailedMap
              routeObjects={routeObjects}
              selectedObjectId={selectedObjectId}
              setSelectedObjectId={setSelectedObjectId}
              routeColor={routeColor}
              scrollToIndex={scrollToIndex}
            />
            <BottomSheet bottomSheetRef={bottomSheetRef} snapPoints={snapPoints}>
              <View style={styles.videoContainer}>
                <View style={styles.guideHeader}>
                  <View style={styles.guideTitleContainer}>
                    <Icon name="routes" size={20} color={colors.white_FFFFFF} />
                    <Text numberOfLines={2} style={styles.guideTitle}>
                      {route?.title}
                    </Text>
                  </View>

                  {route?.yt_video_id ? (
                    <TouchableOpacity style={styles.showVideoContainer} onPress={toggleVideo}>
                      {!isVideoOpened ? (
                        <Icon name="arrow-right-blue" size={20} color={colors.dodgerBlue_4D91FB} />
                      ) : null}
                      <Text style={styles.showVideoText}>{isVideoOpened ? t('Спрятать') : t('Видео гайд')}</Text>
                      {isVideoOpened ? <Icon name="close" size={20} color={colors.dodgerBlue_4D91FB} /> : null}
                    </TouchableOpacity>
                  ) : null}
                </View>

                {isVideoOpened ? (
                  <View style={styles.videoPlayerContainer}>
                    <VideoPlayer video={route?.yt_video_id} />
                  </View>
                ) : null}
              </View>
              <ObjectsList
                data={routeObjects}
                objectsListRef={objectsListRef}
                setSelectedObjectId={setSelectedObjectId}
                cityName={city.name}
                routeColor={routeColor}
              />
            </BottomSheet>
          </View>
          <View style={styles.buttonContainer}>
            <Button title={t('Начать маршрут')} onPress={onPressStartRoute} />
          </View>
        </>
      ) : null}
      {/* <Modal
        isVisible={isVideoModalOpened}
        style={styles.modalContainer}
        backdropTransitionOutTiming={0}
        onBackdropPress={closeVideoModal}>
        <View style={styles.videoPlayerContainer}>
          <VideoPlayer video={'YQEMIy6t_o4'} />
        </View>
      </Modal> */}
    </View>
  );
};

const mapStateToProps = (state: TGlobalState) => ({
  route: state.routeDetailed.route,
  routeObjects: state.routeDetailed.objects,
  routeColor: state.routeDetailed.routeColor,
  city: state.global.city,
});
const mapDispatchToProps = (dispatch: Dispatch<IGetObjectDetailed>) => ({
  _getObjectDetailed: (id: string, navigationType: TScreenNavigationType) =>
    dispatch(getObjectDetailed(id, navigationType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetailed);
