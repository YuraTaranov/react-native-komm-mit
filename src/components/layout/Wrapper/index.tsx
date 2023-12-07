import React from 'react';
import {View, SafeAreaView} from '@components';
import styles from './styles';

const Wrapper: React.FC<TProps> = ({children}) => {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
};

export default Wrapper;

type TProps = {};
