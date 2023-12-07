import React from 'react';
import {Dispatch} from 'redux';
import {useCallback} from '@hooks';
import {Keyboard, LocalitiesList} from '@components';
import {ISetCity, TCity} from '@types';
import {connect} from 'react-redux';
import {setCity} from '@reducers/global';
import {goBack} from '@services';

type TProps = {
  setCity: (city: TCity) => void;
};

const ChangeCity: React.FC<TProps> = ({setCity}) => {
  const onPressCity = useCallback(
    city => () => {
      setCity(city);
      goBack();
      Keyboard.dismiss();
    },
    [],
  );

  const onPressUseMyLocation = useCallback(() => {
    goBack();
  }, []);

  return <LocalitiesList onPressCity={onPressCity} onPressUseMyLocation={onPressUseMyLocation} />;
};

const mapDispatchToProps = (dispatch: Dispatch<ISetCity>) => ({
  setCity: (city: TCity) => dispatch(setCity(city)),
});

export default connect(null, mapDispatchToProps)(ChangeCity);
