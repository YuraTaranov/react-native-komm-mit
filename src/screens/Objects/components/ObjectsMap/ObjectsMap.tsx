import React from 'react';
import {useCallback, useMemo, useTranslation, useState, useRef, useEffect} from '@hooks';
import {View, MapView, Geolocation, Alert, PROVIDER_GOOGLE, Icon, TouchableOpacity, Marker, Image} from '@components';
import styles from './styles';
import {TGlobalState, TMapBoundaries, TObject, TRegion} from '@types';
import {colors, device, INITIAL_REGION} from '@constants';
import {geolocationRequest} from '@services';
import CustomMarker from '../CustomMarker/CustomMarker';

type TProps = {
  objects: TObject[];
  userGeolocation: TGlobalState['userGeolocation'];
  selectedObjectId: string | null;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<string | null>>;
  scrollToIndex: (index: number) => void;
};

const ObjectsMap: React.FC<TProps> = ({
  objects,
  userGeolocation,
  scrollToIndex,
  selectedObjectId,
  setSelectedObjectId,
}) => {
  const {t} = useTranslation();
  const mapRef: React.RefObject<any> = useRef<any>(null);
  const [region, setRegion] = useState<TRegion>(INITIAL_REGION);

  useEffect(() => {
    geolocationRequest();
  }, []);

  useEffect(() => {
    if (objects.length) {
      setSelectedObjectId(null);
      scrollToIndex(0);
    }
  }, [objects]);

  useEffect(() => {
    if (objects.length) {
      setTimeout(() => {
        animateToRegion({
          ...objects[0].location.coordinates,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        });
      }, 100);
      return;
    } else if (userGeolocation.latitude) {
      setTimeout(() => {
        animateToRegion({
          latitude: userGeolocation.latitude,
          longitude: userGeolocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        });
      }, 100);
      return;
    }
  }, [userGeolocation, objects]);

  useEffect(() => {
    const findObject = objects.find(i => i.id === selectedObjectId);
    findObject &&
      animateToRegion({
        ...findObject.location.coordinates,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
  }, [objects, selectedObjectId]);

  const animateToRegion: (region: TRegion) => void = useCallback(region => {
    mapRef?.current?.animateToRegion(region, 500);
  }, []);

  const onPressMarker: (object: TObject) => void = useCallback(
    object => {
      const findIndex = objects.findIndex(item => item.id === object.id);
      scrollToIndex(findIndex);
      setSelectedObjectId(object.id);
    },
    [objects],
  );

  const onPressMarkerIos = useCallback(
    object => () => {
      onPressMarker(object);
    },
    [],
  );

  const animateToUserLocation: () => void = useCallback(() => {
    Geolocation.getCurrentPosition(
      position => {
        animateToRegion({...INITIAL_REGION, ...position.coords});
      },
      error => {
        if (error.message === 'Location permission denied') {
          geolocationRequest();
        } else {
          Alert.alert('', t('Геолокация недоступна, проверьте подключение к Интернету и к службам геолокации'));
        }
      },
      {enableHighAccuracy: true, timeout: 10000, maximumAge: 1000},
    );
    setSelectedObjectId(null);
  }, []);

  const onRegionChangeComplete: (region: TRegion) => void = useCallback(region => {
    setRegion(region);
  }, []);

  const MarkersList: JSX.Element[] = useMemo(() => {
    return objects.map(object => {
      return !device.isIos ? (
        <CustomMarker
          key={object.id} // required if use custom component
          object={object}
          onPressMarker={onPressMarker}
          selectedObjectId={selectedObjectId}
        />
      ) : (
        <Marker
          key={object.id}
          coordinate={object.location.coordinates}
          onPress={onPressMarkerIos(object)}
          style={[
            styles.markerContainer,
            selectedObjectId === object.id && device.isIos && styles.markerContainerActive,
          ]}>
          <View
            style={[
              styles.markerContentContainer,
              selectedObjectId === object.id && styles.markerContentContainerActive,
            ]}>
            <Image source={{uri: object.cover || ''}} style={styles.markerImage} />
          </View>
        </Marker>
      );
    });
  }, [objects, selectedObjectId]);

  return (
    <>
      <MapView
        ref={mapRef}
        initialRegion={region}
        // provider={PROVIDER_GOOGLE}
        // onRegionChangeComplete={onRegionChangeComplete}
        style={styles.container}
        clusterColor={colors.dodgerBlue_4D91FB}
        clusteringEnabled={device.isIos ? true : false}
        zoomControlEnabled={false}
        showsUserLocation
        showsMyLocationButton={false}
        loadingEnabled={false}>
        {MarkersList}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.myLocationButton} onPress={animateToUserLocation}>
          <Icon name="geo" size={24} color={colors.blue_007AFF} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ObjectsMap;
