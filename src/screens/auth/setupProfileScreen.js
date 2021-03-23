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
import {regex, W_WIDTH} from '../../utils/regex';
import HeaderComponent from '../../components/general/Header';

class setupProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  onFinishPress = () => {
    regex.setDashboard({
      token: '122323432'
    })
  };

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
            Here we go !
          </Text>
          <Text style={[styles.descriptionText, {color: theme.secondaryColor}]}>
            Please provide your name and an optional profile photo.
          </Text>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            <View style={styles.textInput}>
              <TextInput
                style={{height: 45, color: theme.primaryColor}}
                value={this.state.name}
                placeholder="Name"
                placeholderTextColor={theme.primaryColor}
                maxLength={15}
                onChangeText={(name) => this.setState({name})}
              />
            </View>
          </View>
          <TouchableWithoutFeedback onPress={this.onFinishPress}>
            <View style={styles.continueView}>
              <Text style={styles.continueText}>Finish</Text>
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

export default connect(mapStateToProps)(setupProfileScreen);

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
    flex: 1,
    borderBottomWidth: 1,
    borderColor: LIGHTGRAY,
  },
  continueView: {
    marginTop: 100,
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
