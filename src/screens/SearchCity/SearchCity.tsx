import React from 'react';
import {Dispatch} from 'redux';
import {useCallback} from '@hooks';
import {Keyboard, LocalitiesList} from '@components';
import {ISetCity, ISetFirstOpenApp, TCity} from '@types';
import {connect} from 'react-redux';
import {setCity, setFirstOpenApp} from '@reducers/global';

type TProps = {
  setFirstOpenApp: (arg: boolean) => void;
  setCity: (city: TCity) => void;
};

const SearchCity: React.FC<TProps> = ({setFirstOpenApp, setCity}) => {
  const onPressCity = useCallback(
    city => () => {
      setCity(city);
      setFirstOpenApp(false);
      Keyboard.dismiss();
    },
    [],
  );

  return <LocalitiesList onPressCity={onPressCity} />;
};

const mapDispatchToProps = (dispatch: Dispatch<ISetFirstOpenApp | ISetCity>) => ({
  setFirstOpenApp: (arg: boolean) => dispatch(setFirstOpenApp(arg)),
  setCity: (city: TCity) => dispatch(setCity(city)),
});

export default connect(null, mapDispatchToProps)(SearchCity);
