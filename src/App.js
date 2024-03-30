import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { Provider as PaperProvider} from 'react-native-paper';

import AppNavigator from './AppNavigator';

const FILE_NAME = 'App.js'

const App = () => {

  const PRODUCTION_MODE = false;
  if(PRODUCTION_MODE){
    console.log = () => {};
  }
  
  return (
    <Provider store={store}>
      <PaperProvider>

        <AppNavigator />

      </PaperProvider>
    </Provider>
  );
};

export default CodePush(App);