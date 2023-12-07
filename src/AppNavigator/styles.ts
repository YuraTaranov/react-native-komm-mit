import {StyleSheet} from 'react-native';
import {colors, fonts} from '@constants';

const styles = StyleSheet.create({
  headerStyle: {
	elevation: 0,
    shadowOpacity: 0,
  },
  headerLeftContainerStyle: {
	paddingLeft: 24,
  },
  headerRightContainerStyle: {},
  headerTitleStyle: {
	fontFamily: fonts.Rubik.Medium,
	fontSize: 17,
	color: colors.black_1D2438,
	paddingRight: 24,
  },
  cardStyle: {},
});

export default styles;
