import {StyleSheet} from '@components';
import {bottom, colors, device, fonts, width} from '@constants';

const buttonHeight = 48;

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  title: {
    fontFamily: fonts.Rubik.Bold,
    fontSize: 24,
    width: width - 100,
  },
  objectNumberShadowView: {
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 5.5,
      height: 5.5,
    },
    shadowColor: colors.grey_AEAEC0,
    shadowRadius: 11,
  },
  objectNumberShadowContainer: {
    width: 47,
    height: 45,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectNumberContainer: {
    borderRadius: 50,
    height: 34,
    width: 34,
    backgroundColor: colors.orange_FF9500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  objectNumber: {
    color: colors.white_FFFFFF,
    fontFamily: fonts.Rubik.Bold,
    fontSize: 18,
  },
  itemAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  itemAddress: {
    marginLeft: 4,
    color: colors.silverChalice_A0A0A0,
  },
  aboutObjectContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  aboutObjectTitle: {
    color: colors.silverChalice_A0A0A0,
  },
  aboutObject: {
    marginTop: 8,
    width: width - 100,
  },
  audioPlayerContainer: {
    position: 'absolute',
    zIndex: 3,
    bottom: 0,
    height: 85 + (device.isIos ? bottom : 0),
    backgroundColor: colors.white_FFFFFF,
  },
  headphones: {
    height: 36,
    width: 36,
    marginRight: 6,
  },
  buttonsContainer: {
    marginTop: 36,
    height: 70,
    marginBottom: 80,
  },
  buttonFullNextContainer: {
    height: buttonHeight,
    backgroundColor: colors.dodgerBlue_4D91FB,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonFullPrevContainer: {
    height: buttonHeight,
    backgroundColor: colors.white_FFFFFF,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.dodgerBlue_4D91FB,
  },
  buttonTextPrev: {
    fontSize: 17,
    fontFamily: fonts.Rubik.Bold,
    color: colors.dodgerBlue_4D91FB,
  },
  buttonTextNext: {
    fontSize: 17,
    fontFamily: fonts.Rubik.Bold,
    color: colors.white_FFFFFF,
  },
  buttonsHalfContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: buttonHeight,
    justifyContent: 'space-between',
  },
  buttonPrev: {
    width: width / 2 - 32,
    height: buttonHeight,
    backgroundColor: colors.white_FFFFFF,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: colors.dodgerBlue_4D91FB,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonNext: {
    width: width / 2 - 32,
    height: buttonHeight,
    backgroundColor: colors.dodgerBlue_4D91FB,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowColor: colors.blue_5C99F9,
    shadowRadius: 10,
  },
});
