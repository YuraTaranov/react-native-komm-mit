import { colors, device } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {},
	markerContainer: {
		width: device.isIos ? 90 : 75,
		height: device.isIos ? 120 : 90,
		alignItems: 'center',
	},
	markerContainerActive: {
		height: 150,
	},
	markerContentContainer: {
		width: 50,
		height: 50,
		backgroundColor: colors.white_FFFFFF,
		borderBottomLeftRadius: 100,
		borderTopLeftRadius: 100,
		borderTopRightRadius: 100,
		borderBottomRightRadius: 0,
		transform: [{rotate: '45deg'}],
		paddingTop: 3,
		paddingLeft: 3,
	  },
	  markerContentContainerActive: {
		width: 70,
		height: 70,
		backgroundColor: colors.dodgerBlue_4D91FB,
		paddingTop: 8,
		paddingLeft: 8,
	  },
	  markerImage: {
		width: '80%',
		height: '80%',
		borderRadius: 50,
		transform: [{rotate: '-45deg'}],
		marginTop: 3,
		marginLeft: 3,
		borderWidth: 2,
		borderColor: colors.white_FFFFFF,
	  },
})