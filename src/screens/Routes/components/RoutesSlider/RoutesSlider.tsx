import React from 'react';
import {useCallback} from '@hooks';
import {View, Text, FlatList, TouchableOpacity, ImageBackground, Icon} from '@components';
import styles from './styles';
import {TRoute} from '@types';
import {colors, hitSlop, width} from '@constants';

const cardWidth = Math.floor(width * 0.6 + 8); // card width + margin

type TProps = {
  data: TRoute[];
  routesListRef: React.RefObject<FlatList<any>>;
  openRoute: (id: string) => () => void;
  setSelectedRouteId: React.Dispatch<React.SetStateAction<string | null>>;
  cityName: string;
  isPlayerVisible: boolean;
};

const RoutesSlider: React.FC<TProps> = ({
  data,
  routesListRef,
  openRoute,
  setSelectedRouteId,
  cityName,
  isPlayerVisible,
}) => {
  const handleOnScroll = useCallback(
    event => {
      if (!event) {
        return;
      }
      const offsetX = event.nativeEvent.contentOffset.x + 15;
      const currentIndex = Math.floor(offsetX / cardWidth);
      currentIndex >= 0 && currentIndex <= data.length - 1 && setSelectedRouteId(data[currentIndex].id);
    },
    [data],
  );

  const selectRoute: (id: string) => () => void = useCallback(
    id => () => {
      setSelectedRouteId(id);
    },
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: TRoute; index: number}) => (
      <TouchableOpacity
        style={{...styles.itemContainer, marginRight: index === data.length - 1 ? width / 2.5 : 8}}
        activeOpacity={0.9}
        onPress={selectRoute(item.id)}>
        <ImageBackground
          source={{uri: item.cover || ''}}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <View style={styles.itemCircleOuter}>
            <View style={{...styles.itemCircleInner, backgroundColor: item.color}} />
          </View>
        </ImageBackground>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.itemAddressContainer}>
            <View style={styles.itemPinContainer}>
              <Icon name="pin" size={14} color={colors.black_1D2438} />
              <Text style={styles.itemAddress} numberOfLines={1}>
                {cityName}
              </Text>
            </View>
            <TouchableOpacity hitSlop={hitSlop} onPress={openRoute(item.id)}>
              <Icon name="arrow-right-blue" size={30} color={colors.dodgerBlue_4D91FB} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [cityName, data.length],
  );

  const keyExtractor: (item: TRoute) => string = useCallback(item => String(item.id), []);

  return (
    <View style={{...styles.container, bottom: isPlayerVisible ? 86 : 24}}>
      <FlatList
        ref={routesListRef}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth}
        snapToAlignment="start"
        onMomentumScrollEnd={handleOnScroll}
        horizontal
        keyExtractor={keyExtractor}
        style={styles.flatList}
      />
    </View>
  );
};

export default RoutesSlider;
