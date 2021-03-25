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
import axios from 'axios';

class phoneNumberScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryCode: RNLocalize.getCountry(),
      getCountry: null,
      phone_number: '',
    };
  }

  continueHanlder = () => {
    const {navigation} = this.props;
    axios.post('https://chatapi.namaste.in/api/login', {
        "appVersion": "8.2.78",
        "devicetoken": "frSRyR_VTmOA70fapR6WWv:APA91bELkHgRjbc9RR0fpai-5-rnz9jWYR8bpWcEK71HydqEm4fYlULlKFZzAW6P3-nvMZbgKPrcS_52O7S460-hac42YXhdT645edio2uwv3tAbUj8RdNTkbtgx_k5HDuIx-vMydg_B",
        "loginParam": "+919000006515",
        "LengthParam": "4"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    // navigation.navigate('VerificationCode');
  }

  render() {
    const {theme, navigation} = this.props;
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
                value={this.state.phone_number}
                placeholder="Phone Number"
                placeholderTextColor={theme.primaryColor}
                keyboardType={'phone-pad'}
                maxLength={15}
                onChangeText={(phone_number) => this.setState({phone_number})}
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
            onPress={this.continueHanlder}>
            <View style={styles.continueView}>
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
});

export default connect(mapStateToProps)(phoneNumberScreen);

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
    backgroundColor: ONLINE,
  },
  continueText: {
    fontSize: 14,
    fontWeight: '800',
    color: White,
  },
});
