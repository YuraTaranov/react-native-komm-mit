import {StyleSheet} from '@components';
import {colors, fonts, width} from '@constants';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    flex: 1,
  },
  bottomSheetContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
  },
  buttonContainer: {
    position: 'absolute',
    zIndex: 3,
    width: width - 32,
    alignSelf: 'center',
    bottom: 24,
  },
  videoContainer: {
    paddingHorizontal: 24,
    marginTop: 16,
  },
  guideHeader: {
    flexDirection: 'row',
  },
  guideTitleContainer: {
    flex: 1,
    height: 44,
    borderRadius: 30,
    backgroundColor: colors.fuchsiaBlue_8043C2,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  guideTitle: {
    marginLeft: 8,
    color: colors.white_FFFFFF,
    fontFamily: fonts.Rubik.Regular,
    fontSize: 12,
    flex: 1,
  },
  showVideoContainer: {
    marginLeft: 8,
    height: 44,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.dodgerBlue_4D91FB,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  showVideoText: {
    color: colors.dodgerBlue_4D91FB,
    fontSize: 12,
    fontFamily: fonts.Rubik.Regular,
    marginHorizontal: 4,
  },
  videoButtonContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoButtonText: {},
  modalContainer: {},
  videoPlayerContainer: {
    width: '100%',
    borderRadius: 12,
  },
});
