import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white_FFFFFF,
    justifyContent: 'space-around',
  },
  tabContainer: {
	  alignItems: 'center',
	  marginTop: 8,
  },
  tabText: {
	  fontFamily: fonts.Rubik.Medium,
	  fontSize: 12,
  },
  underscore: {
	  fontSize: 28,
	  color: colors.dodgerBlue_4D91FB,
	  lineHeight: 12,
  }
});
