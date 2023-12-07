import React from 'react';
import {connect} from 'react-redux';
import {useState, useCallback, useRef} from '@hooks';
import {View, FlatList} from '@components';
import styles from './styles';
import {TGlobalState, TObject, TScreenNavigationType} from '@types';
import {Dispatch} from 'redux';
import ObjectsSlider from './components/ObjectsSlider/ObjectsSlider';
import {getObjectDetailed} from '@reducers/objectDetailed';
import {IGetObjectDetailed} from 'src/types/actions/objectDetailed';
import {ISetRouteObjectsIds} from 'src/types/actions/routeDetailed';
import {setRouteObjectsIds} from '@reducers/routeDetailed';
import ObjectsMap from './components/ObjectsMap/ObjectsMap';

type TProps = {
  objects: TObject[];
  getObjectDetailed: (id: string, navigationType: TScreenNavigationType) => void;
  setRouteObjectsIds: (data: string[]) => ISetRouteObjectsIds;
  userGeolocation: TGlobalState['userGeolocation'];
  cityName: string;
  isPlayerVisible: boolean;
};

const Objects: React.FC<TProps> = ({
  objects,
  getObjectDetailed,
  setRouteObjectsIds,
  userGeolocation,
  cityName,
  isPlayerVisible,
}) => {
  const objectsListRef = useRef<FlatList>(null);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    objectsListRef?.current?.scrollToIndex({index});
  }, []);

  const openObject = useCallback(
    (id: string) => () => {
      setRouteObjectsIds([]);
      getObjectDetailed(id, 'navigate');
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.mapView}>
        <ObjectsMap
          objects={objects}
          userGeolocation={userGeolocation}
          scrollToIndex={scrollToIndex}
          selectedObjectId={selectedObjectId}
          setSelectedObjectId={setSelectedObjectId}
        />
      </View>
      <ObjectsSlider
        data={objects}
        objectsListRef={objectsListRef}
        openObject={openObject}
        setSelectedObjectId={setSelectedObjectId}
        cityName={cityName}
        isPlayerVisible={isPlayerVisible}
      />
    </View>
  );
};

const mapStateToPros = (state: TGlobalState) => ({
  objects: state.objects.data,
  userGeolocation: state.userGeolocation,
  cityName: state.global.city.name,
  isPlayerVisible: state.audioPlayer.playerVisible,
});

const mapDispatchToProps = (dispatch: Dispatch<ISetRouteObjectsIds | IGetObjectDetailed>) => ({
  setRouteObjectsIds: (data: string[]) => dispatch(setRouteObjectsIds(data)),
  getObjectDetailed: (id: string, navigationType: TScreenNavigationType) =>
    dispatch(getObjectDetailed(id, navigationType)),
});

export default connect(mapStateToPros, mapDispatchToProps)(Objects);
