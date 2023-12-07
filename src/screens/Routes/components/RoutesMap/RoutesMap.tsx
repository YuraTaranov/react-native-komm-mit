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
import {TGlobalState, TMapBoundaries, TRegion, TRoute} from '@types';
import {colors, device, GOOGLE_MAPS_APIKEY_ANDROID, GOOGLE_MAPS_APIKEY_IOS, INITIAL_REGION} from '@constants';
import {geolocationRequest} from '@services';

type TProps = {
  routes: TRoute[];
  userGeolocation: TGlobalState['userGeolocation'];
  selectedRouteId: string | null;
  setSelectedRouteId: React.Dispatch<React.SetStateAction<string | null>>;
  scrollToIndex: (index: number) => void;
};

const RoutesMap: React.FC<TProps> = ({routes, userGeolocation, selectedRouteId, setSelectedRouteId, scrollToIndex}) => {
  const {t} = useTranslation();
  const mapRef: React.RefObject<any> = useRef<any>(null);
  const [region, setRegion] = useState<TRegion>(INITIAL_REGION);
  //   const [boundaries, setBoundaries] = useState<TMapBoundaries>();

  useEffect(() => {
    geolocationRequest();
  }, []);

  useEffect(() => {
    if (routes.length) {
      setSelectedRouteId(null);
      scrollToIndex(0);
    }
  }, [routes]);

  useEffect(() => {
    if (routes.length) {
      setTimeout(() => {
        animateToRegion({
          ...routes[0].objects[0].location.coordinates,
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
  }, [userGeolocation, routes]);

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
    setSelectedRouteId(null);
  }, []);

  useEffect(() => {
    const findObject = routes.find(i => i.id === selectedRouteId)?.objects[0];
    findObject &&
      animateToRegion({
        ...findObject.location.coordinates,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
  }, [routes, selectedRouteId]);

  const animateToRegion: (region: TRegion) => void = useCallback(region => {
    mapRef?.current?.animateToRegion(region, 500);
  }, []);

  const onPressMarker: (routeId: string) => () => void = useCallback(
    routeId => () => {
      const findRouteIndex = routes.findIndex(item => item.id === routeId);
      scrollToIndex(findRouteIndex);
      setSelectedRouteId(routeId);
    },
    [routes],
  );

  //   const onRegionChangeComplete: (region: TRegion) => void = useCallback(region => {
  //     setRegion(region);
  //   }, []);

  const MarkersList: JSX.Element[] = useMemo(() => {
    return (
      routes
        .map(route => {
          return route.objects.map(object => {
            return (
              <Marker
                key={object.id}
                coordinate={object.location.coordinates}
                onPress={onPressMarker(route.id)}
                tracksViewChanges={false}>
                <View style={styles.markerContentContainer}>
                  <View style={{...styles.markerNumberContainer, backgroundColor: route.color}}>
                    <Text style={styles.markerNumber}>{object.order}</Text>
                  </View>
                </View>
              </Marker>
            );
          });
        })
        // @ts-ignore flat
        .flat()
    );
  }, [routes]);

  const RouteList: (JSX.Element | null)[] = useMemo(() => {
    return routes.map(route => {
      const objectsList = route?.objects;

      if (objectsList?.length && objectsList?.length > 1) {
        const origin = objectsList[0].location.coordinates;
        const destination = objectsList[objectsList.length - 1].location.coordinates;
        const waypoints =
          objectsList.length > 2 ? objectsList.map(i => i.location.coordinates).slice(1, -1) : undefined;

        return (
          <MapViewDirections
            key={route.id}
            origin={origin}
            destination={destination}
            waypoints={waypoints}
            apikey={device.isIos ? GOOGLE_MAPS_APIKEY_IOS : GOOGLE_MAPS_APIKEY_ANDROID}
            strokeWidth={3}
            lineDashPhase={4}
            lineDashPattern={[8, 8, 8, 8]}
            tappable
            strokeColor={route.color}
            mode="WALKING"
            precision="high"
            resetOnChange={false}
            // @ts-ignore
            onPress={onPressMarker(route.id)}
            // onReady={onDirectionReady}
            // onError={onDirectionError}
            // onReady={onDirectionReady}
          />
        );
      } else {
        return null;
      }
    });
  }, [routes]);

  return (
    <>
      <MapView
        ref={mapRef}
        // provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={styles.container}
        clusterColor={colors.dodgerBlue_4D91FB}
        // onRegionChangeComplete={onRegionChangeComplete}
        // clusteringEnabled={false}
        zoomControlEnabled={false}
        showsUserLocation
        showsMyLocationButton={false}
        // minZoomLevel={10}
        // maxZoomLevel={20}
      >
        {MarkersList}
        {RouteList}
      </MapView>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.myLocationButton} onPress={animateToUserLocation}>
          <Icon name="geo" size={24} color={colors.blue_007AFF} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RoutesMap;
