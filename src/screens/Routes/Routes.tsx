import React, {Dispatch} from 'react';
import {connect} from 'react-redux';
import {useCallback, useRef, useState, useEffect} from '@hooks';
import {FlatList, View} from '@components';
import styles from './styles';
import {TGlobalState, TRoute, TScreenNavigationType} from '@types';
import SearchAddress from './components/SearchAddress/SearchAddress';
import RoutesSlider from './components/RoutesSlider/RoutesSlider';
import {getRouteDetailed} from '@reducers/routeDetailed';
import {IGetRouteDetailed} from 'src/types/actions/routeDetailed';
import RoutesMap from './components/RoutesMap/RoutesMap';
import {setUserGeolocation} from '@reducers/userGeolocation';
import {getRoutes} from '@reducers/routes';
import {IGetRoutes} from 'src/types/actions/routes';
import {getObjects} from '@reducers/objects';
import {IGetObjects} from 'src/types/actions/objects';

type TProps = {
  routes: TRoute[];
  getRouteDetailed: (id: string, navigationType: TScreenNavigationType) => void;
  userGeolocation: TGlobalState['userGeolocation'];
  city: TGlobalState['global']['city'];
  getRoutes: (cityId: string) => void;
  getObjects: (cityId: string) => void;
  isPlayerVisible: boolean;
};

const Routes: React.FC<TProps> = ({
  routes,
  getRouteDetailed,
  userGeolocation,
  city,
  getRoutes,
  getObjects,
  isPlayerVisible,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const routesListRef = useRef<FlatList>(null);

  const scrollToIndex = useCallback((index: number) => {
    routesListRef?.current?.scrollToIndex({index});
  }, []);

  const openRoute = useCallback(
    (id: string) => () => {
      getRouteDetailed(id, 'navigate');
    },
    [],
  );

  const filteredRoutes = routes.length ? routes.filter(i => i.objects.length) : [];

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <RoutesMap
          routes={routes}
          userGeolocation={userGeolocation}
          selectedRouteId={selectedRouteId}
          setSelectedRouteId={setSelectedRouteId}
          scrollToIndex={scrollToIndex}
        />
      </View>
      <SearchAddress city={city} />
      <RoutesSlider
        data={filteredRoutes}
        routesListRef={routesListRef}
        openRoute={openRoute}
        setSelectedRouteId={setSelectedRouteId}
        cityName={city.name}
        isPlayerVisible={isPlayerVisible}
      />
    </View>
  );
};

const mapStateToPros = (state: TGlobalState) => ({
  routes: state.routes.data,
  userGeolocation: state.userGeolocation,
  city: state.global.city,
  isPlayerVisible: state.audioPlayer.playerVisible,
});

const mapDispatchToProps = (dispatch: Dispatch<IGetRoutes | IGetRouteDetailed | IGetObjects>) => ({
  getRoutes: (cityId: string) => dispatch(getRoutes(cityId)),
  getObjects: (cityId: string) => dispatch(getObjects(cityId)),
  getRouteDetailed: (id: string, navigationType: TScreenNavigationType) =>
    dispatch(getRouteDetailed(id, navigationType)),
  setUserGeolocation: (data: TGlobalState['userGeolocation']) => dispatch(setUserGeolocation(data)),
});

export default connect(mapStateToPros, mapDispatchToProps)(Routes);
