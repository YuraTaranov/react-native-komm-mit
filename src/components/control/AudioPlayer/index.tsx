import React from 'react';
import {useMemo, useTranslation, useState, useEffect, useCallback} from '@hooks';
import {
  View,
  Text,
  Image,
  Slider,
  TouchableOpacity,
  Icon,
  TrackPlayer,
  AudioPlayerState,
  AudioPlayerCapability,
  usePlayerProgress,
  Swipeable,
  ActivityIndicator,
  usePlaybackState,
  PlayerRepeatMode,
} from '@components';
import styles from './styles';
import {bottom, colors, device} from '@constants';
import {assets} from '@assets';
import {TGlobalState} from '@types';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {setIsPlaying, setPlayerVisible} from '@reducers/audioPlayer';
import {ISetIsPlaying} from 'src/services/http/services/audioPlayer/types';

type TProps = {
  cityName: string;
  playerVisible: boolean;
  isPlaying: boolean;
  isNeedBottomMargin: boolean;
  setIsPlaying: (arg: boolean) => void;
  setPlayerVisible: (arg: boolean) => void;
};

const AudioPlayer: React.FC<TProps> = ({
  cityName,
  playerVisible,
  isPlaying,
  setIsPlaying,
  setPlayerVisible,
  isNeedBottomMargin,
}) => {
  const {t} = useTranslation();
  const [currentTrackName, setCurrentTrackName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [seekValue, setSeekValue] = useState<number>(0);
  const progress = usePlayerProgress();
  const playbackState = usePlaybackState();

  const setupPlayer = useCallback(async () => {
    await TrackPlayer.updateOptions({
      // stopWithApp: false, // false => music continues in background even when app is closed
      // Media controls capabilities
      capabilities: [
        AudioPlayerCapability.Play,
        AudioPlayerCapability.Pause,
        AudioPlayerCapability.SkipToPrevious,
        AudioPlayerCapability.SkipToNext,
        // AudioPlayerCapability.Stop,
        // AudioPlayerCapability.SeekTo,
      ],
      // Capabilities that will show up when the notification is in the compact form on Android
      compactCapabilities: [
        AudioPlayerCapability.Play,
        AudioPlayerCapability.Pause,
        AudioPlayerCapability.SkipToPrevious,
        AudioPlayerCapability.SkipToNext,
        // AudioPlayerCapability.Stop,
        // AudioPlayerCapability.SeekTo,
      ],
    });
    await TrackPlayer.setupPlayer();
    await TrackPlayer.setRepeatMode(PlayerRepeatMode.Queue);
  }, []);

  useEffect(() => {
    setupPlayer();
    return () => {
      TrackPlayer.destroy();
      setPlayerVisible(false);
    };
  }, []);

  TrackPlayer.getCurrentTrack().then(index => {
    index !== null &&
      TrackPlayer.getTrack(index).then(track => {
        track?.title !== currentTrackName && setCurrentTrackName(track?.title || '');
      });
  });

  useEffect(() => {
    if (playbackState === AudioPlayerState.Buffering || playbackState === 8) {
      setIsLoading(true);
    } else if (playbackState === AudioPlayerState.Ready) {
      setIsLoading(false);
    }
  }, [playbackState]);

  useEffect(() => {
    if (isLoading) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isPlaying) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    setSeekValue(progress.position);
  }, [progress.position]);

  const onSlidingComplete: (value: number | number[]) => void = (value: number | number[]) => {
    const formattedValue = Array.isArray(value) ? value[0] : value;
    TrackPlayer.seekTo(formattedValue);
    setSeekValue(formattedValue);
  };

  const onPressPlayerButton: () => void = async () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const onPressPrev: () => void = () => {
    TrackPlayer.seekTo(0);
    TrackPlayer.skipToPrevious();
    setSeekValue(0);
  };

  const onPressNext: () => void = () => {
    TrackPlayer.seekTo(0);
    TrackPlayer.skipToNext();
    setSeekValue(0);
  };

  const closePlayer = useCallback(() => {
    setIsPlaying(false);
    setPlayerVisible(false);
    TrackPlayer.reset();
  }, []);

  const playerButtons = useMemo(() => {
    if (isPlaying) {
      return assets.pause_button;
    } else {
      return assets.play_button;
    }
  }, [isPlaying]);

  const renderRightActions = useCallback(() => {
    return (
      <TouchableOpacity style={styles.rightAction} onPress={closePlayer}>
        <Text style={styles.rightActionText}>{t('Закрыть')}</Text>
      </TouchableOpacity>
    );
  }, []);

  return playerVisible ? (
    <Swipeable
      containerStyle={[
        styles.container,
        {
          bottom: isNeedBottomMargin ? (device.isIos && bottom ? 90 : 56) : 0,
          height: isNeedBottomMargin ? 80 : device.isIos && bottom ? 114 : 80,
        },
      ]}
      renderRightActions={renderRightActions}
      overshootRight={false}
      leftThreshold={10}
      rightThreshold={10}>
      <View style={styles.contentContainer}>
        <Slider
          containerStyle={styles.sliderContainer}
          trackStyle={styles.trackStyle}
          minimumValue={0}
          maximumValue={progress.duration}
          step={1}
          thumbStyle={styles.thumbStyle}
          onSlidingComplete={onSlidingComplete}
          value={seekValue}
          thumbTintColor={colors.dodgerBlue_4D91FB}
          minimumTrackTintColor={colors.dodgerBlue_4D91FB}
          maximumTrackTintColor={colors.athensGray_F2F3F5}
        />
        <View style={styles.playerContainer}>
          <View style={styles.trackContainer}>
            <Text numberOfLines={1}>{currentTrackName}</Text>
            <Text style={styles.trackDescription} numberOfLines={1}>
              {cityName}
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            {/* <TouchableOpacity style={styles.buttonPrev} onPress={onPressPrev}>
              <Icon name="playerNext" size={24} color={colors.dodgerBlue_4D91FB} />
            </TouchableOpacity> */}
            {!isLoading ? (
              <TouchableOpacity onPress={onPressPlayerButton}>
                <Image source={playerButtons} style={styles.playButton} />
              </TouchableOpacity>
            ) : (
              <View style={styles.indicatorContainer}>
                <ActivityIndicator size="large" color={colors.dodgerBlue_4D91FB} />
              </View>
            )}
            {/* <TouchableOpacity style={styles.buttonNext} onPress={onPressNext}>
              <Icon name="playerPrev" size={24} color={colors.dodgerBlue_4D91FB} />
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.buttonNext} onPress={closePlayer}>
              <Icon name="close" size={24} color={colors.dodgerBlue_4D91FB} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  ) : null;
};

const mapStateToProps = (state: TGlobalState) => ({
  playerVisible: state.audioPlayer.playerVisible,
  isPlaying: state.audioPlayer.isPlaying,
  isNeedBottomMargin: state.audioPlayer.isNeedBottomMargin,
});

const mapDispatchToProps = (dispatch: Dispatch<ISetIsPlaying>) => ({
  setIsPlaying: (arg: boolean) => dispatch(setIsPlaying(arg)),
  setPlayerVisible: (arg: boolean) => dispatch(setPlayerVisible(arg)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer);
