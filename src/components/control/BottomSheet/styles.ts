import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
container: {
	flex: 1,
},
handle: {
	borderTopLeftRadius: 24,
	borderTopRightRadius: 24,
},
handleIndicator: {
	backgroundColor: colors.athensGray_F2F3F5,
	width: 56,
	marginTop: 10,
},
});