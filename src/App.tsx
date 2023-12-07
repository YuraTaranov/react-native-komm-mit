import React from 'react';
import storage from './store';
import {StatusBar, Loader, NoInternetModal} from '@components';
import AppNavigator from './AppNavigator/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from '@constants';

const App: React.FC = () => {
  return (
    <Provider store={storage.store}>
      <PersistGate loading={null} persistor={storage.persistor}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.white_FFFFFF} />
        <NoInternetModal>
          <Loader>
            <AppNavigator />
          </Loader>
        </NoInternetModal>
      </PersistGate>
    </Provider>
  );
};

export default App;
