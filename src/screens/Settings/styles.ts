import {StyleSheet} from 'react-native';
import {colors} from '@constants';

export default StyleSheet.create({
  container: {
	  padding: 16,
	  flex: 1,
	  backgroundColor: colors.white_FFFFFF
  },
  langContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  justifyContent: 'space-between',
	  height: 56,
	  borderBottomWidth: 1,
	  borderColor: colors.athensGray_F2F3F5,
  },
  langTitleContainer: {
	  flexDirection: 'row',
	  alignItems: 'center',
  },
  langTitle: {
	  marginLeft: 8,
	  fontSize: 17,
  },
  langValueContainer: {
	flexDirection: 'row',
	alignItems: 'center',
  },
  langValue: {
	  marginRight: 16,
	  fontSize: 12,
	  color: colors.grey_828282
  },
});
