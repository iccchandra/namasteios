import React, {Component} from 'react';
import {View, StyleSheet, Text, TouchableWithoutFeedback} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  GRAY,
  ONLINE,
  White,
} from '../../themes/constantColors';
import {W_WIDTH} from '../../utils/regex';
import {connect} from 'react-redux';

class instructionScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {theme, navigation} = this.props;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <View style={styles.textView}>
          <Text style={styles.guideText}>Simple, Secure.</Text>
          <Text style={styles.guideText}>Reliable messaging.</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('PhoneNumber')}>
            <View style={styles.getStartedView}>
              <Text style={styles.getStartedText}>Get Started</Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.loginView}>
            <Text style={[styles.loginText, {color: theme.secondaryColor}]}>Already have an account ? </Text>
            <Text
              style={[styles.loginText, {color: ONLINE, fontWeight: '600'}]}>
              Log In
            </Text>
          </View>
        </View>
        <View style={styles.logoView}>
          <FastImage
            source={{
              uri:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQn7jQWusm_HFd3jGHAXgwa5vTnEhatWYGoSNt8tGMU130LcM4Z&usqp=CAU',
            }}
            style={{width: 222, height: 180}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(instructionScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoView: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    height: 180,
    alignItems: 'center',
  },
  guideText: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '800',
    color: GRAY,
    width: 220,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  getStartedView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    height: 46,
    width: W_WIDTH - 40,
    backgroundColor: ONLINE,
  },
  getStartedText: {
    fontSize: 14,
    fontWeight: '800',
    color: White,
  },
  loginView: {
    marginTop: 45,
    flexDirection: 'row',
  },
  loginText: {
    fontSize: 14,
    fontWeight: '400',
  },
});
