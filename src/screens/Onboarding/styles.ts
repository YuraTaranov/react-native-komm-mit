import {StyleSheet} from 'react-native';
import {bottom, colors, fonts, width} from '@constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: bottom || 32,
  },
  contentContainer: {
	  flex: 1,
	  justifyContent: 'space-evenly'
  },
  image: {
	  width: width  - 32,
	  height: width / 1.4,
	  alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.Rubik.Bold,
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 28,
    color: colors.black_000000,
  },
  subtitle: {
    color: colors.silverChalice_A0A0A0,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default styles;
