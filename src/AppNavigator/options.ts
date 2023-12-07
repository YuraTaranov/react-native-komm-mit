import {RouteProp} from '@react-navigation/native';
import styles from './styles';

export const defaultStackOptions: any | ((props: {route: RouteProp<any>; navigation: any}) => any) = {
  headerBackTitleVisible: false,
  headerTitleAlign: 'center',
  headerStyle: styles.headerStyle,
  headerTitleStyle: styles.headerTitleStyle,
  headerLeftContainerStyle: styles.headerLeftContainerStyle,
  cardStyle: styles.cardStyle,
};

export const headerStyle = {};

export const cardStyle = styles.cardStyle;
