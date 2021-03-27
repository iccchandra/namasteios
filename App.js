import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigators/AppNavigator';
import {enableScreens} from 'react-native-screens';
import store from './src/store';

enableScreens();

export const getStore = store;

class App extends React.Component {
  render() {
    return (
      <Provider store={getStore}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
