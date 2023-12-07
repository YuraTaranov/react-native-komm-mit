import React from 'react';
import {useCallback, useTranslation, useState, useMemo} from '@hooks';
import {
  View,
  SnapCarousel,
  Pagination,
  Image,
  HeaderBackButton,
  Modal,
  ImageViewer,
  TouchableOpacity,
  Icon,
  ActivityIndicator,
} from '@components';
import styles from './styles';
import {colors, hitSlop, width} from '@constants';
import {goBack} from '@services';

type TProps = {
  data: string[];
};

const ObjectCarousel: React.FC<TProps> = ({data}) => {
  const {t} = useTranslation();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const imagesForZoom = useMemo(() => data.map(i => ({url: i})), [data]);

  const openImage = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const closeImage = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const renderItem = useCallback(({item}: {item: string}) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={openImage} activeOpacity={1}>
        <Image source={{uri: item}} style={styles.itemImage} />
      </TouchableOpacity>
    );
  }, []);

  const renderIndicator = useCallback((props: any) => <></>, []);

  const loadingIndicator = useCallback(
    () => (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator color={colors.white_FFFFFF} size="large" />
      </View>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity onPress={goBack} hitSlop={hitSlop}>
          <Icon size={24} name="arrow-left" color={colors.white_FFFFFF} />
        </TouchableOpacity>
      </View>
      {data?.length ? (
        <>
          <SnapCarousel
            data={data}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            onBeforeSnapToItem={setActiveIndex}
            inactiveSlideOpacity={1}
            inactiveSlideScale={1}
            activeAnimationType="spring"
            lockScrollWhileSnapping={true}
            lockScrollTimeoutDuration={350}
            shouldOptimizeUpdates={true}
            removeClippedSubviews={true}
            enableMomentum={true}
            loop={true}
          />
          <Pagination
            dotsLength={data?.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.dotsContainer}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.dotsStyleInactive}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />
          <Modal
            isVisible={isModalVisible}
            style={styles.modalContainer}
            backdropTransitionOutTiming={0}
            animationIn="fadeIn"
            animationOut="fadeOut">
            {/* <TouchableOpacity style={styles.closeContainer} onPress={closeImage} hitSlop={hitSlop}>
              <Icon size={24} name="close" color={colors.white_FFFFFF} />
            </TouchableOpacity> */}
            <ImageViewer
              imageUrls={imagesForZoom}
              backgroundColor={'transparent'}
              onSwipeDown={closeImage}
              saveToLocalByLongPress={false}
              renderIndicator={renderIndicator}
              index={0}
              enableSwipeDown
              useNativeDriver
              loadingRender={loadingIndicator}
              onClick={closeImage}
            />
          </Modal>
        </>
      ) : null}
    </View>
  );
};

export default ObjectCarousel;
