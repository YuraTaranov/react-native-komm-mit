import {StyleSheet} from 'react-native';
import {bottom, colors, width} from '@constants';

export default StyleSheet.create({
  modalContainer: {
    margin: 0,
  },
  container: {
    position: 'absolute',
    zIndex: 3,
    bottom: bottom,
    height: 80,
  },
  contentContainer: {
    width: width,
    height: '100%',
    backgroundColor: colors.white_FFFFFF,
  },
  sliderContainer: {
    height: 24,
    zIndex: 3,
  },
  trackStyle: {
    width: width,
    height: 4,
  },
  thumbStyle: {},
  playerContainer: {
    paddingLeft: 24,
    marginTop: -4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    height: 44,
    width: 44,
  },
  indicatorContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackContainer: {
    paddingRight: 8,
    width: '60%',
  },
  trackDescription: {
    fontSize: 12,
    marginTop: 4,
    color: colors.silverChalice_A0A0A0,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonPrev: {
    marginLeft: 16,
  },
  buttonNext: {
    marginHorizontal: 16,
  },
  changeTrackContainer: {
    height: 76,
    width: 135,
    zIndex: 1,
    marginTop: -6,
    backgroundColor: colors.blue_DBE8FD,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevTrackButton: {
    marginLeft: 16,
  },
  rightAction: {
    backgroundColor: colors.athensGray_F2F3F5,
    height: '100%',
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightActionText: {
    color: colors.silverChalice_A0A0A0,
  },
});
