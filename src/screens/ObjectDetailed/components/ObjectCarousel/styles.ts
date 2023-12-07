import { colors, top } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		height: '65%',
		backgroundColor: colors.white_FFFFFF,
	},
	backContainer: {
		position: 'absolute',
		zIndex: 2,
		left: 24,
		top: top + 8,
		backgroundColor: colors.black_000000,
		borderRadius: 50,
		paddingLeft: 4,
		paddingRight: 6,
		paddingVertical: 5,
	},
	itemContainer: {
		width: '100%',
		height: '100%',
	},
	itemImage: {
		flex: 1,
	},
	dotsContainer: {
		paddingTop: 16,
		paddingBottom: 16,
		position: 'absolute',
		zIndex: 2,
		bottom: '8%',
		alignSelf: 'center'
	  },
	  dotStyle: {
		width: 8,
		height: 8,
		borderRadius: 30,
		backgroundColor: colors.white_FFFFFF,
	  },
	  dotsStyleInactive: {
		marginHorizontal: 0,
		width: 8,
		height: 8,
		backgroundColor: colors.athensGray_F2F3F5,
	  },
	  modalContainer: {
		margin: 0,
		backgroundColor: colors.black_000000,
	  },
	  closeContainer: {
		top: '10%',
		right: 16,
		position: 'absolute',
		zIndex: 2,
	  },
	  indicatorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	  }
})