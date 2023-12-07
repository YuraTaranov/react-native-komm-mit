import {StyleSheet} from 'react-native';
import {colors, width, fonts, height} from '@constants';

export default StyleSheet.create({
  container: {
	  flex: 1,
	  backgroundColor: colors.white_FFFFFF,
	  paddingHorizontal: 24,
	  paddingTop: 20,
  },
  imageMain: {
	  width: width - 48,
	  height: height * 0.35,
	  borderRadius: 16,
  },
  title: {
	  marginTop: 24,
	  fontSize: 20,
	  fontFamily: fonts.Rubik.Bold,
  },
  description: {
	  marginTop: 24,
  },
  videoContainer: {
	  marginTop: 24,
  },
  image: {
	marginTop: 24,
	width: width - 48,
	height: height * 0.26,
	borderRadius: 16,
	marginBottom: 40,
  },
});
