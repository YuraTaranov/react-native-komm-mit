import { colors, fonts } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {},
	itemContainerShadow: {
		shadowOpacity: 0.2,
		shadowOffset: {
			width: 5,
			height: 5,
		},
		shadowColor: colors.grey_AEAEC0,
		shadowRadius: 20,
		marginHorizontal: 24,
		marginTop: 16,
	},
	itemContainer: {
		width: '100%',
		height: 125,
		flexDirection: 'row',
		borderRadius: 16,
		backgroundColor: colors.white_FFFFFF,
		alignSelf: 'center'
	},
	imageBackgroundContainer: {
		width: 120,
		height: 120,
		borderRadius: 16,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
	imageBackground: {
		width: '100%',
		height: '100%',
		borderRadius: 16,
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
		width: 33,
		height: 32,
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
		height: 24,
		width: 24,
		justifyContent: 'center',
		alignItems: 'center'
	},
	objectNumber: {
		color: colors.white_FFFFFF,
		fontFamily: fonts.Rubik.Bold,
		fontSize: 13,
	},
	itemInfoContainer: {
		flex: 1,
		margin: 16,
	},
	itemTitle: {
		color: colors.black_1D2438,
		fontFamily: fonts.Rubik.Bold,
		fontSize: 17,
	},
	itemAddressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 8,
	},
	itemAddress: {
		marginLeft: 4,
		color: colors.silverChalice_A0A0A0,
		flex: 1,
	},
	arrowBlueContainer: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		flex: 1,
	},
})