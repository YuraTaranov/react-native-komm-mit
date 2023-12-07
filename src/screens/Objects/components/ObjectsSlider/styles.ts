import { colors, fonts, width } from '@constants';
import {StyleSheet} from 'react-native';

const itemHeight = width * 0.29

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
		width: width * 0.85,
		height: itemHeight,
		marginRight: 8,
		flexDirection: 'row',
		backgroundColor: colors.white_FFFFFF,
		borderRadius: 16,
	},
	itemImage: {
		height: itemHeight,
		width: itemHeight,
		borderRadius: 16,
	},
	itemInfoContainer: {
		height: itemHeight,
		width: width * 0.55,
		paddingTop: 12,
		paddingHorizontal: 12,
	},
	itemTitle: {
		fontFamily: fonts.Rubik.Bold,
		fontSize: 17,
		color: colors.black_1D2438,
	},
	itemAddressContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 4,
		marginBottom: 8,
		flex: 1,
	},
	itemPinContainer: {
		flexDirection: 'row',
		alignItems: 'flex-start',
	},
	itemAddress: {
		marginLeft: 2,
		color: colors.silverChalice_A0A0A0,
		width: width * 0.37,
	},
	itemArrow: {
		alignSelf: 'flex-end'
	}
})