import React from 'react';
import {useCallback} from '@hooks';
import {TouchableOpacity, Icon} from '@components';
import {colors, hitSlop} from '@constants';
import {goBack} from '@services';

type TProps = {
  onPress?: () => void;
};

const HeaderBackButton: React.FC<TProps> = ({onPress = goBack}) => {
  const press = useCallback(() => {
    onPress();
  }, []);

  return (
    <TouchableOpacity onPress={press} hitSlop={hitSlop}>
      <Icon size={24} name="arrow-left" color={colors.grey_AEAEC0} />
    </TouchableOpacity>
  );
};

export default HeaderBackButton;
