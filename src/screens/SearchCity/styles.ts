import {StyleSheet} from '@components';
import {colors, fonts} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: colors.white_FFFFFF
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
	marginTop: 4,
	paddingHorizontal: 16,
	marginHorizontal: 16,
	height: 46,
	borderRadius: 36,
	borderWidth: 1,
	borderColor: colors.athensGray_F2F3F5,
	backgroundColor: colors.white_FFFFFF,
  },
  input: {
	marginLeft: 8,
	color: colors.black_1D2438,
	height: 46,
  },
  useMyLocationContainer: {
	  marginHorizontal: 16
  },
  citiesContainer: {
	  marginTop: 24,
  },
  cityNameContainer: {
	height: 56,
	justifyContent: 'center',
	paddingHorizontal: 16,
  },
  cityNameContainerActive: {
	  backgroundColor: colors.blue_F1F6FF,
	  borderRightWidth: 4,
	  borderColor: colors.dodgerBlue_4D91FB
  },
  cityName: {
	fontSize: 17,
	color: colors.black_1D2438,
  },
});
