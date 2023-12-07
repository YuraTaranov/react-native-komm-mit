import {DropShadow} from '@components';
import React from 'react';
import {View, StyleProp, ViewStyle, Text} from 'react-native';

import styles from './styles';

type Props = {
  onPress?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
};

const Button: React.FC<Props> = ({onPress, containerStyle, title}) => (
  <DropShadow onTouchStart={onPress} style={styles.shadow}>
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  </DropShadow>
);

export default Button;
