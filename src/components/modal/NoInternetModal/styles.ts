import {StyleSheet} from 'react-native';
import {colors, fonts, height, width} from '@constants';

export default StyleSheet.create({
container: {
	flex: 1,
},
modalContainer: {
	margin: 0,
	backgroundColor: colors.white_FFFFFF,
	justifyContent: 'flex-start',
	paddingHorizontal: 24,
},
image: {
	width: width - 8,
	height: height * 0.35,
	alignSelf: 'center',
	marginTop: '30%',
},
title: {
	marginTop: 24,
	fontSize: 24,
	color: colors.dodgerBlue_4D91FB,
	fontFamily: fonts.Rubik.Bold,
	textAlign: 'center',
},
description: {
	marginTop: 24,
	fontSize: 18,
	color: colors.grey_828282,
	fontFamily: fonts.Rubik.Medium,
	textAlign: 'center',
},
buttonContainer: {
	width: width - 48,
	height: 48,
	marginTop: 36,
	alignSelf: 'center',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 36,
	borderWidth: 1,
	borderColor: colors.dodgerBlue_4D91FB,
},
buttonText: {
	color: colors.dodgerBlue_4D91FB,
	fontSize: 17,
	fontFamily: fonts.Rubik.Bold,
},
});