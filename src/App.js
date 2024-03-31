import React, {useEffect, useState} from 'react';
import {Text} from 'react-native'
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { Provider as PaperProvider} from 'react-native-paper';

import AppNavigator from './AppNavigator';

let persistor = persistStore(store);

const App = () => {

  const PRODUCTION_MODE = false;
  if(PRODUCTION_MODE){
    console.log = () => {};
  }
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>

          <AppNavigator />

        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;