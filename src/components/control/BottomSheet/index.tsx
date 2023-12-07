import React from 'react';
import {BS} from '@components';
import styles from './styles';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

type TProps = {
  bottomSheetRef: React.RefObject<BottomSheetMethods>;
  snapPoints?: string[];
};

const snapPointsDefault = ['40%', '95%'];

const BottomSheet: React.FC<TProps> = ({children, bottomSheetRef, snapPoints = snapPointsDefault}) => {
  return (
    <BS
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      animateOnMount={false}
      style={styles.container}
      backgroundStyle={styles.handle}
      handleIndicatorStyle={styles.handleIndicator}>
      {children}
    </BS>
  );
};

export default BottomSheet;
