import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {LIGHTGRAY, ONLINE, White} from '../../themes/constantColors';
import CountryPicker from 'react-native-country-picker-modal';
import * as RNLocalize from 'react-native-localize';
import {W_WIDTH} from '../../utils/regex';
import HeaderComponent from '../../components/general/Header';
import * as actionTypes from '../../actions/index';
import SplashScreen from '../SplashScreen';

class phoneNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: RNLocalize.getCountry(),
      getCountry: null,
    };
  }

  continueHandler = () => {
    const { navigation, phoneNumber } = this.props;
    this.props.login(phoneNumber)
    navigation.navigate('VerificationCode');
  }

  render() {
    const {theme, navigation, loading, phoneNumber, validatePhomeNumber} = this.props;
    if (loading) {
      return <SplashScreen />;
    }
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
            Welcome to Namaste
          </Text>
          <Text style={[styles.descriptionText, {color: theme.secondaryColor}]}>
            Provide your phone number, so we can be able to send you
            confirmation code.
          </Text>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={styles.countryCodeView}>
              <CountryPicker
                onSelect={(value) => {
                  this.setState({
                    countryCode: value.cca2,
                    getCountry: value,
                  });
                }}
                styles={{itemCountryName: {borderBottomWidth: 0}}}
                countryCode={this.state.countryCode}
                withAlphaFilter={true}
                withCallingCode={true}
                withFilter={true}
                translation="eng">
                <Text>{`+${this.state.countryCode}`}</Text>
              </CountryPicker>
            </View>
            <View style={styles.textInput}>
              <TextInput
                style={{height: 45, color: theme.primaryColor}}
                value={phoneNumber}
                placeholder="Phone Number"
                placeholderTextColor={theme.primaryColor}
                keyboardType={'phone-pad'}
                maxLength={15}
                onChangeText={(phoneNumber) => this.props.updateNumber(phoneNumber)}
              />
            </View>
          </View>
          <Text
            style={[styles.subDescriptionText, {color: theme.secondaryColor}]}>
            By countinuing, you are indicating that you agree to the{' '}
            <Text style={{fontWeight: '800'}}>Privacy Policy</Text> and{' '}
            <Text style={{fontWeight: '800'}}>Terms.</Text>
          </Text>
          <TouchableWithoutFeedback
            // onPress={() => navigation.navigate('VerificationCode')}>
            onPress={validatePhomeNumber ? this.continueHandler : null}>
            <View style={[styles.continueView, { backgroundColor: validatePhomeNumber ? ONLINE : LIGHTGRAY }]}>
              <Text style={styles.continueText}>Continue</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.auth.theme,
  loading: state.auth.loading,
  data: state.auth.data,
  phoneNumber: state.auth.phoneNumber,
  validatePhomeNumber: state.auth.validatePhomeNumber
});

const mapDispatchToProps = dispatch => {
  return {
    updateNumber: (phoneNumber) => dispatch(actionTypes.updateNumber(phoneNumber)),
    login: (phoneNumber) => dispatch(actionTypes.auth(phoneNumber))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(phoneNumberScreen);

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
  countryCodeView: {
    width: 80,
    height: 50,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: LIGHTGRAY,
  },
  textInput: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: LIGHTGRAY,
  },
  subDescriptionText: {
    marginTop: 20,
    fontSize: 14,
    fontWeight: '400',
  },
  continueView: {
    marginTop: 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 23,
    height: 46,
    width: W_WIDTH - 40,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '800',
    color: White,
  },
});
