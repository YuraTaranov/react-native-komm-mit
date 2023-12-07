import React from 'react';
import {useCallback, useTranslation, useEffect} from '@hooks';
import {View, Text, BottomSheetFlatList, TouchableOpacity, Icon, ImageBackground, DropShadow} from '@components';
import styles from './styles';
import {TObject, TScreenNavigationType} from '@types';
import {colors, hitSlop} from '@constants';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setRouteObjectsIds} from '@reducers/routeDetailed';
import {ISetRouteObjectsIds} from 'src/types/actions/routeDetailed';
import {getObjectDetailed} from '@reducers/objectDetailed';
import {IGetObjectDetailed} from 'src/types/actions/objectDetailed';

type TProps = {
  data: TObject[];
  objectsListRef: React.MutableRefObject<null>;
  setRouteObjectsIds: (data: string[]) => ISetRouteObjectsIds;
  getObjectDetailed: (id: string, navigationType: TScreenNavigationType) => IGetObjectDetailed;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<string | undefined>>;
  cityName: string;
  routeColor: string;
};

const ObjectsList: React.FC<TProps> = ({
  data,
  objectsListRef,
  setRouteObjectsIds,
  getObjectDetailed,
  setSelectedObjectId,
  cityName,
  routeColor,
}) => {
  const {t} = useTranslation();

  useEffect(() => {
    // need when open object from route detailed (not from objects tab screen)
    setRouteObjectsIds(data.map(i => i.id));
  }, []);

  const selectObjectOnMap: (id: string) => () => void = useCallback(
    id => () => {
      setSelectedObjectId(id);
    },
    [],
  );

  const onPressObject = useCallback(
    id => () => {
      getObjectDetailed(id, 'navigate');
    },
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: TObject; index: number}) => (
      <DropShadow style={styles.itemContainerShadow}>
        <TouchableOpacity
          style={{...styles.itemContainer, marginBottom: index === data.length - 1 ? 90 : 0}}
          activeOpacity={0.8}
          onPress={selectObjectOnMap(item.id)}>
          <ImageBackground
            source={{uri: item.cover || ''}}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}>
            <DropShadow style={styles.objectNumberShadowView}>
              <View style={styles.objectNumberShadowContainer}>
                <View style={{...styles.objectNumberContainer, backgroundColor: routeColor}}>
                  <Text style={styles.objectNumber}>{item.order}</Text>
                </View>
              </View>
            </DropShadow>
          </ImageBackground>
          <View style={styles.itemInfoContainer}>
            <Text style={styles.itemTitle} numberOfLines={2}>
              {item.title}
            </Text>
            <View style={styles.itemAddressContainer}>
              <Icon name="pin" size={14} color={colors.black_1D2438} />
              <Text style={styles.itemAddress} numberOfLines={1}>
                {cityName}
              </Text>
            </View>
            <View style={styles.arrowBlueContainer}>
              <TouchableOpacity hitSlop={hitSlop} onPress={onPressObject(item.id)}>
                <Icon name="arrow-right-blue" size={30} color={colors.dodgerBlue_4D91FB} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </DropShadow>
    ),
    [cityName, routeColor],
  );

  const keyExtractor: (item: TObject) => string = useCallback(item => String(item.id), []);

  return (
    <BottomSheetFlatList
      ref={objectsListRef}
      data={data}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      style={styles.container}
    />
  );
};

const mapDispatchToProps = (dispatch: Dispatch<ISetRouteObjectsIds | IGetObjectDetailed>) => ({
  setRouteObjectsIds: (data: string[]) => dispatch(setRouteObjectsIds(data)),
  getObjectDetailed: (id: string, navigationType: TScreenNavigationType) =>
    dispatch(getObjectDetailed(id, navigationType)),
});

export default connect(null, mapDispatchToProps)(ObjectsList);
