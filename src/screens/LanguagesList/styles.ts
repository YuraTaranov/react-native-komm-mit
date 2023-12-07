import {StyleSheet} from '@components';
import {colors} from '@constants'

export default StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: colors.white_FFFFFF,
	paddingTop: 8,
  },
  itemContainer: {
	  height: 56,
	  width: '100%',
	  justifyContent: 'center',
	  paddingHorizontal: 24,
  },
  activeItemContainer: {
	  backgroundColor: colors.blue_DBE8FD,
	  borderRightWidth: 4,
	  borderColor: colors.dodgerBlue_4D91FB
  },
  itemText: {
	fontSize: 17
  },
  activeItemText: {
	  color: colors.dodgerBlue_4D91FB
  },
});
