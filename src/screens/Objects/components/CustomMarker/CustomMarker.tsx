import React from 'react';
import {useCallback, useState} from '@hooks';
import {View, Marker, Image} from '@components';
import styles from './styles';
import {device} from '@constants';
import {TObject} from '@types';

type TProps = {
  object: TObject;
  onPressMarker: (object: TObject) => void;
  selectedObjectId: string | null;
};

const CustomMarker: React.FC<TProps> = ({object, onPressMarker, selectedObjectId}) => {
  const [tracksViewChanges, setTracksViewChanges] = useState(true);

  const onPress = useCallback(() => {
    onPressMarker(object);
  }, [object]);

  const onLoadEnd = useCallback(() => {
    setTracksViewChanges(false);
  }, []);

  return (
    <Marker
      coordinate={object.location.coordinates}
      onPress={onPress}
      tracksViewChanges={device.isIos ? true : tracksViewChanges}
      style={[styles.markerContainer, selectedObjectId === object.id && device.isIos && styles.markerContainerActive]}>
      <View
        style={[styles.markerContentContainer, selectedObjectId === object.id && styles.markerContentContainerActive]}>
        <Image source={{uri: object.cover || ''}} style={styles.markerImage} onLoadEnd={onLoadEnd} />
      </View>
    </Marker>
  );
};

export default CustomMarker;
