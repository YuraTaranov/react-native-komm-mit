import { colors, device } from '@constants';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonsContainer: {
		position: 'absolute',
		zIndex: 2,
		width: 45,
		height: 45,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: colors.white_FFFFFF,
		top: '10%',
		right: 8,
		borderWidth: 1,
		borderColor: colors.grey_CDCED2,
	},
	infoButton: {
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: colors.grey_CDCED2,
		width: 45,
		height: 45,
	},
	myLocationButton: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 3
	},
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