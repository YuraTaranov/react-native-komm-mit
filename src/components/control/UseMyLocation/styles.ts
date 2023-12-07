import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
	useMyLocationContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 24,
	},
	geoIconContainer: {
		height: 36,
		width: 36,
		borderRadius: 50,
		backgroundColor: colors.blue_DBE8FD,
		justifyContent: 'center',
		alignItems: 'center',
	},
	useMyLocationText: {
		color: colors.black_1D2438,
		marginLeft: 8
	},
});