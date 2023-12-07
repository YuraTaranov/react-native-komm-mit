import {StyleSheet} from '@components';
import {colors, fonts, top} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
	  flex: 1,
  },
  closeContainer: {
	  flex: 1,
	  paddingTop: (top || 24) + 16,
	  paddingRight: 24,
	  alignItems: 'flex-end',
  },
  bottomSheet: {
	  backgroundColor: colors.white_FFFFFF,
	  height: 300,
	  width: '100%',
	  borderTopRightRadius: 24,
	  borderTopLeftRadius: 24,
	  paddingHorizontal: 24,
  },
  lineContainer: {
	  marginTop: 14,
	  justifyContent: 'center',
	  alignItems: 'center',
  },
  line: {
	backgroundColor: colors.athensGray_F2F3F5,
	height: 4,
	width: 56,
	borderRadius: 4,
  },
  title: {
	  fontFamily: fonts.Rubik.Bold,
	  fontSize: 20,
	  color: colors.black_1D2438,
	  marginTop: 24,
	  textAlign: 'center'
  },
  shadow: {
	shadowColor: colors.grey_AEAEC0,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  searchContainer: {
	flexDirection: 'row',
	alignItems: 'center',
	marginTop: 24,
	paddingHorizontal: 16,
	height: 46,
	width: '100%',
	borderRadius: 36,
	borderWidth: 1,
	borderColor: colors.athensGray_F2F3F5,
	backgroundColor: colors.white_FFFFFF,
  },
  searchText: {
	marginLeft: 8,
	color: colors.silverChalice_A0A0A0,
  },
});
