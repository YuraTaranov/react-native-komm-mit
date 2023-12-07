import React from 'react';
import {useCallback, useMemo, useTranslation, useState, useRef, useEffect} from '@hooks';
import {
  View,
  Text,
  MapView,
  Marker,
  Geolocation,
  Alert,
  PROVIDER_GOOGLE,
  MapViewDirections,
  TouchableOpacity,
  Icon,
} from '@components';
import styles from './styles';
import {TCoordinates, TMapBoundaries, TObject, TRegion} from '@types';
import {colors, device, GOOGLE_MAPS_APIKEY_ANDROID, GOOGLE_MAPS_APIKEY_IOS} from '@constants';
import {geolocationRequest} from '@services';

const INITIAL_REGION: TRegion = {
  latitude: 49.988443,
  longitude: 36.23283,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

type TProps = {
  routeObjects: TObject[];
  selectedObjectId?: string;
  routeColor: string;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<string | undefined>>;
  scrollToIndex: (index: number) => void;
};

const RouteDetailedMap: React.FC<TProps> = ({
  routeObjects,
  selectedObjectId,
  routeColor,
  setSelectedObjectId,
  scrollToIndex,
}) => {
  const {t} = useTranslation();
  const mapRef: React.RefObject<any> = useRef<any>(null);
  const [region, setRegion] = useState<TRegion>({
    ...routeObjects[0].location.coordinates,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  useEffect(() => {
    geolocationRequest();
  }, []);

  useEffect(() => {
    const findObject = routeObjects.find(i => i.id === selectedObjectId);
    findObject &&
      animateToRegion({
        ...findObject.location.coordinates,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
  }, [routeObjects, selectedObjectId]);

  const animateToRegion: (region: TRegion) => void = useCallback(region => {
    mapRef?.current?.animateToRegion(region, 500);
  }, []);

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
  }, []);

  const onPressMarker: (object: TObject) => () => void = useCallback(
    object => () => {
      const findIndex = routeObjects.findIndex(item => item.id === object.id);
      scrollToIndex(findIndex);
      setSelectedObjectId(object.id);
    },
    [routeObjects],
  );

  const onRegionChangeComplete: (region: TRegion) => void = useCallback(region => {
    setRegion(region);
  }, []);

  const MarkersList: JSX.Element[] = useMemo(() => {
    return routeObjects.map((object, index) => {
      return (
        <Marker
          key={object.id}
          coordinate={object.location.coordinates}
          onPress={onPressMarker(object)}
          tracksViewChanges={false}>
          <View style={styles.markerContentContainer}>
            <View style={{...styles.markerNumberContainer, backgroundColor: routeColor}}>
              <Text style={styles.markerNumber}>{`${index + 1}`}</Text>
            </View>
          </View>
        </Marker>
      );
    });
  }, [routeObjects, routeColor]);

  const RouteDirection: JSX.Element | null = useMemo(() => {
    if (routeObjects?.length) {
      const origin: TCoordinates = routeObjects[0].location.coordinates;
      const destination: TCoordinates = routeObjects[routeObjects.length - 1].location.coordinates;
      const waypoints: TCoordinates[] | undefined =
        routeObjects.length > 2 ? routeObjects.map(i => i.location.coordinates).slice(1, -1) : undefined;

      return (
        <MapViewDirections
          origin={origin}
          destination={destination}
          waypoints={waypoints}
          apikey={device.isIos ? GOOGLE_MAPS_APIKEY_IOS : GOOGLE_MAPS_APIKEY_ANDROID}
          strokeWidth={3}
          lineDashPhase={4}
          lineDashPattern={[8, 8, 8, 8]}
          tappable
          strokeColor={routeColor || colors.black_000000}
          mode="WALKING"
          precision="high"
          resetOnChange={false}
          // @ts-ignore
          // onReady={onDirectionReady}
          // onError={onDirectionError}
          // onReady={onDirectionReady}
        />
      );
    } else {
      return null;
    }
  }, [routeColor]);

  return (
    <>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={styles.container}
        clusterColor={colors.dodgerBlue_4D91FB}
        onRegionChangeComplete={onRegionChangeComplete}
        clusteringEnabled={false}
        zoomControlEnabled={false}
        showsUserLocation
        showsMyLocationButton={false}
        // minZoomLevel={10}
        // maxZoomLevel={20}
      >
        {MarkersList}
        {RouteDirection}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.myLocationButton} onPress={animateToUserLocation}>
          <Icon name="geo" size={24} color={colors.blue_007AFF} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RouteDetailedMap;
