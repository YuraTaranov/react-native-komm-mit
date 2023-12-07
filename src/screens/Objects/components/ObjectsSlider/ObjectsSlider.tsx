import React from 'react';
import {useCallback} from '@hooks';
import {View, Text, FlatList, TouchableOpacity, Icon, Image} from '@components';
import styles from './styles';
import {TObject} from '@types';
import {colors, hitSlop, width} from '@constants';

const cardWidth = Math.floor(width * 0.85 + 8.5); // card width + margin

type TProps = {
  data: TObject[];
  objectsListRef: React.RefObject<FlatList<any>>;
  openObject: (id: string) => () => void;
  setSelectedObjectId: React.Dispatch<React.SetStateAction<string | null>>;
  cityName: string;
  isPlayerVisible: boolean;
};

const ObjectsSlider: React.FC<TProps> = ({
  data,
  objectsListRef,
  openObject,
  setSelectedObjectId,
  cityName,
  isPlayerVisible,
}) => {
  const handleOnScroll = useCallback(
    event => {
      if (!event) return;
      const offsetX = event.nativeEvent.contentOffset.x + 15;
      const currentIndex = Math.floor(offsetX / cardWidth);
      currentIndex >= 0 && currentIndex <= data.length - 1 && setSelectedObjectId(data[currentIndex].id);
    },
    [data],
  );

  const selectObject: (id: string) => () => void = useCallback(
    id => () => {
      setSelectedObjectId(id);
    },
    [],
  );

  const renderItem = useCallback(
    ({item, index}: {item: TObject; index: number}) => (
      <TouchableOpacity
        style={{...styles.itemContainer, marginRight: index === data.length - 1 ? 48 : 8}}
        activeOpacity={1}
        onPress={selectObject(item.id)}>
        <Image source={{uri: item.cover || ''}} style={styles.itemImage}></Image>
        <View style={styles.itemInfoContainer}>
          <Text style={styles.itemTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.itemAddressContainer}>
            <View style={styles.itemPinContainer}>
              <Icon name="pin" size={14} color={colors.black_1D2438} />
              <Text style={styles.itemAddress} numberOfLines={2}>
                {cityName}
              </Text>
            </View>
            <TouchableOpacity hitSlop={hitSlop} style={styles.itemArrow} onPress={openObject(item.id)}>
              <Icon name="arrow-right-blue" size={30} color={colors.dodgerBlue_4D91FB} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [cityName, data],
  );

  const keyExtractor: (item: TObject) => string = useCallback(item => String(item.id), []);

  return (
    <View style={{...styles.container, bottom: isPlayerVisible ? 86 : 24}}>
      <FlatList
        ref={objectsListRef}
        data={data}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth}
        snapToAlignment="start"
        horizontal
        onMomentumScrollEnd={handleOnScroll}
        keyExtractor={keyExtractor}
        style={styles.flatList}
      />
    </View>
  );
};

export default ObjectsSlider;
