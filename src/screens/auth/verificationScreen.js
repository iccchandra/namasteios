import React, {Component, createRef} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {Black, GRAY, ONLINE} from '../../themes/constantColors';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {W_WIDTH} from '../../utils/regex';
import HeaderComponent from '../../components/general/Header';
import * as actionTypes from '../../actions/index';

const CELL_COUNT = 4;

class verificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  onChangeText = code => {
    this.setState({value: code}, () => {
      if (code.length >= 4) {
        this.props.verifyOtp(code);
        // this.props.navigation.navigate('SetupProfile');
      }
    });
  };

  field = createRef();

  render() {
    const {theme, navigation} = this.props;
    const {value} = this.state;

    return (
      <View
        style={[
          styles.container,
          {backgroundColor: theme.container.backgroundColor},
        ]}>
        <HeaderComponent
          theme={theme}
          transparent={true}
          leftPress={() => navigation.goBack()}
        />
        <View style={styles.innerView}>
          <FastImage
            source={{
              uri: 'https://i.ya-webdesign.com/images/whatsapp-icon-png-5.png',
            }}
            style={styles.icon}
            resizeMode={'contain'}
          />
          <Text style={[styles.titleText, {color: theme.primaryColor}]}>
            Verification
          </Text>
          <Text style={[styles.descriptionText, {color: theme.secondaryColor}]}>
            We have sent you an SMS with a code to the number that you provided
          </Text>
          <CodeField
            value={value}
            onChangeText={this.onChangeText}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <View
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <Text style={[styles.cellText, {color: theme.primaryColor}]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
          <Text
            style={[styles.subDescriptionText, {color: theme.secondaryColor}]}>
            Resend Code in 0:05
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
});

const mapDispatchToProps = dispatch => {
  return {
    verifyOtp: (code) => dispatch(actionTypes.verifyOTP(code))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(verificationScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerView: {
    padding: 20,
  },
  icon: {width: 60, height: 60, marginTop: 35},
  titleText: {
    marginTop: 45,
    fontSize: 25,
    fontWeight: '800',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
  subDescriptionText: {
    marginTop: 20,
    fontSize: 12,
    fontWeight: '800',
  },
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {
    marginTop: 20,
    width: W_WIDTH - 40,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: GRAY,
    borderBottomWidth: 1,
  },
  cellText: {
    color: Black,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: ONLINE,
    borderBottomWidth: 2,
  },
});
