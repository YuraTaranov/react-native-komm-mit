import { colors, fonts, top, width } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	shadow: {
		shadowColor: colors.grey_AEB3C0,
		shadowOffset: {
		  width: 8,
		  height: 8,
		},
		shadowOpacity: 0.4,
		shadowRadius: 11,
		position: 'absolute',
		zIndex: 2,
		alignSelf: 'center',
		top: top + 8,
	},
	container: {
		height: 46,
		width: width - 64,
		backgroundColor: colors.white_FFFFFF,
		borderRadius: 36,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		borderWidth: 1,
		borderColor: colors.athensGray_F2F3F5,
	},
	input: {
		height: 46,
		width: '100%',
		paddingLeft: 8,
		paddingRight: 24,
		color: colors.black_1D2438,
		fontFamily: fonts.Rubik.Medium,
	},
})