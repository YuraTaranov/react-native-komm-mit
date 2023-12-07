import { colors, fonts } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	markerContentContainer: {
		width: 33,
		height: 32,
		backgroundColor: colors.white_FFFFFF,
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		borderBottomRightRadius: 50,
		borderBottomLeftRadius: 6,
		justifyContent: 'center',
		alignItems: 'center',
	},
	markerNumberContainer: {
		width: 24,
		height: 24,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	markerNumber: {
		fontSize: 13,
		fontFamily: fonts.Rubik.Bold,
		color: colors.white_FFFFFF
	},
	buttonsContainer: {
		position: 'absolute',
		zIndex: 2,
		width: 45,
		height: 45,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: colors.white_FFFFFF,
		top: '15%',
		right: 8,
		borderWidth: 1,
		borderColor: colors.grey_CDCED2,
	},
	myLocationButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 3
	},
})