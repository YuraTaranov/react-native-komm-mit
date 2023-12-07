import {LayoutAnimation, Platform, UIManager} from 'react-native';
import {Easing} from 'react-native-reanimated';

const expand = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
  delete: {
    type: LayoutAnimation.Types.linear,
    property: LayoutAnimation.Properties.opacity,
  },
};

export const animation = (platformName?: TPlatformName) => {
  if (Platform.OS === 'ios') {
    LayoutAnimation.configureNext(expand);
  } else if (platformName !== 'ios' && Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    LayoutAnimation.configureNext(expand);
  }
};

export type TPlatformName = 'ios' | 'android' | undefined;
