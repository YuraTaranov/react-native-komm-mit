import {colors, fonts, width} from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    bottom: 24,
  },
  flatList: {
    paddingLeft: 24,
  },
  itemContainer: {
    width: 247,
    height: 240,
    marginRight: 8,
    backgroundColor: colors.white_FFFFFF,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageBackgroundContainer: {
    height: width * 0.35,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  imageBackground: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  itemCircleOuter: {
    width: 28,
    height: 28,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white_FFFFFF,
    marginRight: 12,
  },
  itemCircleInner: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  itemInfoContainer: {
    height: width * 0.23,
    width: '100%',
    backgroundColor: colors.white_FFFFFF,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  itemTitle: {
    fontFamily: fonts.Rubik.Bold,
    fontSize: 17,
    color: colors.black_1D2438,
    flex: 1,
  },
  itemAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 8,
  },
  itemPinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAddress: {
    marginLeft: 2,
    color: colors.silverChalice_A0A0A0,
    width: width * 0.42,
  },
});
