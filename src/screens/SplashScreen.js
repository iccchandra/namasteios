import React, {Component} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as actionTypes from '../actions/actionTypes';
import {getStore} from '../../App';
import {regex} from '../utils/regex';
import {White} from '../themes/constantColors';
import FastImage from 'react-native-fast-image';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(): void {
    this.bootstrapAsync();
    regex.changeStatusStyle('default');
  }

  bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
      console.log('userToken', userToken);
      if (userToken !== null) {
        getStore.dispatch({type: actionTypes.LOGIN, payload: userToken});
      } else {
        getStore.dispatch({type: actionTypes.LOGOUT});
      }
    } catch (e) {
      getStore.dispatch({type: actionTypes.LOGOUT});
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: White,
        }}>
        <FastImage
          source={require('./../assets/appicons.png')}
          style={{width: 80, height: 80}}
        />
      </View>
    );
  }
}

export default SplashScreen;
