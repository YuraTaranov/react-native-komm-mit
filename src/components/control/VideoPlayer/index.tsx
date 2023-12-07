import React, {useState} from 'react';
import {View, YoutubePlayer} from '@components';
import {useCallback} from '@hooks';
import styles from './styles';
import {colors, width} from '@constants';
import {ActivityIndicator, ViewStyle} from 'react-native';

type TProps = {
  containerStyle?: ViewStyle;
  video: string;
};

const VideoPlayer: React.FC<TProps> = ({containerStyle, video}) => {
  const [isReady, setIsReady] = useState(false);

  const setReady = useCallback(() => {
    setIsReady(true);
  }, []);

  return (
    <View style={[styles.container, containerStyle]}>
      {!isReady ? (
        <View style={styles.activityContainer}>
          <ActivityIndicator size={'large'} color={colors.dodgerBlue_4D91FB} />
        </View>
      ) : null}
      <YoutubePlayer
        height={width * 0.48}
        videoId={video}
        webViewStyle={styles.playerContainer}
        forceAndroidAutoplay
        onReady={setReady}
      />
    </View>
  );
};

export default VideoPlayer;
