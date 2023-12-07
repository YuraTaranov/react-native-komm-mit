import {StyleSheet} from 'react-native';

import {colors, fonts} from '@constants';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.dodgerBlue_4D91FB,
    shadowOffset: {
      width: 10,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  container: {
    borderRadius: 36,
    height: 50,
    width: '100%',
    backgroundColor: colors.dodgerBlue_4D91FB,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.Rubik.Bold,
    fontSize: 17,
    lineHeight: 20,
    color: colors.white_FFFFFF,
    textAlign: 'center',
  },
});

export default styles;
