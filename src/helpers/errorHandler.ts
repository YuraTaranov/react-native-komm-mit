import i18next from 'i18next';
import {Alert} from 'react-native';

const defaultErrorText = i18next.t('В данный момент на сервере проводятся технические работы, извините за неудобства, попробуйте позже')

export const errorHandler = (name: string, error: any) => {
  __DEV__ && console.log(name, JSON.stringify(error, null, 2));
  let resultString = '';
  const errors = error?.data?.errors || [];

  if (error.status === 500) {
	Alert.alert('', defaultErrorText);
	return
  }
  if (errors.length) {
    resultString = `${errors.join('\n')}`;
  } else {
    resultString = error.data?.message || '-';
  }
  Alert.alert('', resultString || defaultErrorText);
};