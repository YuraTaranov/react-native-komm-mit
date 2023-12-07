import React from 'react';
import {ActivityIndicator} from 'react-native';
import {View} from '@components';
import {connect} from 'react-redux';
import {animation} from '@helpers';
import styles from './styles';
import {colors} from '@constants';
import {TGlobalState} from '@types';

type TProps = {
  loading: boolean;
};

const Loader: React.FC<TProps> = ({children, loading}) => {
  animation('ios');
  return (
    <View style={styles.container}>
      {children}
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color={colors.white_FFFFFF} />
        </View>
      )}
    </View>
  );
};
const mapStateToProps = (state: TGlobalState) => ({
  loading: state.additional.loading,
});
export default connect(mapStateToProps)(Loader);
