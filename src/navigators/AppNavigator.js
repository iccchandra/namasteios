import React, {PureComponent} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import instructionScreen from '../screens/auth/instructionScreen';
import phoneNumberScreen from '../screens/auth/phoneNumberScreen';
import verificationScreen from '../screens/auth/verificationScreen';
import {connect} from 'react-redux';
import setupProfileScreen from '../screens/auth/setupProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import homeScreen from '../screens/dashboard/homeScreen';
import selectContactScreen from '../screens/dashboard/contacts/selectContactScreen';
import newGroupScreen from '../screens/dashboard/contacts/newGroupScreen';
import newBroadcastScreen from '../screens/dashboard/broadcast/newBroadcastScreen';
import settingScreen from '../screens/dashboard/settings/settingScreen';
import statusPrivacyScreen from '../screens/dashboard/settings/statusPrivacyScreen';
import statusContactPrivacyScreen from '../screens/dashboard/settings/statusContactPrivacyScreen';
import accountScreen from '../screens/dashboard/settings/account/accountScreen';
import chatSettingScreen from '../screens/dashboard/settings/chat/chatSettingScreen';
import helpSettingScreen from '../screens/dashboard/settings/help/helpSettingScreen';
import notificationSettingScreen from '../screens/dashboard/settings/notifications/notificationSettingScreen';
import dataStorageSettingScreen from '../screens/dashboard/settings/storageusage/dataStorageSettingScreen';
import messageScreen from '../screens/dashboard/message/messageScreen';
import profileScreen from '../screens/dashboard/message/profileScreen';
import cameraScreen from '../screens/dashboard/camera/cameraScreen';
import statusViewerScreen from '../screens/dashboard/status/statusViewerScreen';
import sendingMoneySecreen from '../screens/dashboard/message/sendingMoneySecreen';
import enableFontPatch from './enableFontPatch';

let RootStack = createStackNavigator();
let MainStack = createStackNavigator();
let DashboardStack = createStackNavigator();
enableFontPatch();

const navigationOption = () => {
  return {
    headerShown: false,
    headerBackTitleVisible: false,
  };
};

let appNav = null;

function MainStackScreen() {
  return (
      <MainStack.Navigator screenOptions={navigationOption()}>
        <MainStack.Screen name="Home" component={homeScreen} />
        <MainStack.Screen name="Message" component={messageScreen} />
        <MainStack.Screen name="Profile" component={profileScreen} />
      </MainStack.Navigator>
  );
}

class AppNavigator extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    appNav = this;
  }

  render() {
    const {user, loading} = this.props;

    if (loading) {
      return <SplashScreen />;
    }

    return (
      <NavigationContainer>
        {
          user === null
            ? <RootStack.Navigator screenOptions={navigationOption()}>
                <RootStack.Screen name="Login" component={instructionScreen}/>
                <RootStack.Screen name="PhoneNumber" component={phoneNumberScreen}/>
                <RootStack.Screen name="VerificationCode" component={verificationScreen}/>
                <RootStack.Screen name="SetupProfile" component={setupProfileScreen}/>
              </RootStack.Navigator>
             :  <DashboardStack.Navigator mode="modal" screenOptions={navigationOption()}>
                   <DashboardStack.Screen name="Home" component={MainStackScreen} />
                   <DashboardStack.Screen name="SelectContact" component={selectContactScreen} />
                   <DashboardStack.Screen name="NewGroup" component={newGroupScreen} />
                   <DashboardStack.Screen name="NewBroadcast" component={newBroadcastScreen} />
                   <DashboardStack.Screen name="StatusPrivacy" component={statusPrivacyScreen} />
                   <DashboardStack.Screen name="StatusContactPrivacy" component={statusContactPrivacyScreen} />
                   <DashboardStack.Screen name="Setting" component={settingScreen} />
                   <DashboardStack.Screen name="Account" component={accountScreen} />
                   <DashboardStack.Screen name="ChatSetting" component={chatSettingScreen} />
                   <DashboardStack.Screen name="NotificationSetting" component={notificationSettingScreen} />
                   <DashboardStack.Screen name="DataStorageSetting" component={dataStorageSettingScreen} />
                   <DashboardStack.Screen name="HelpSetting" component={helpSettingScreen} />
                   <DashboardStack.Screen name="Camera" component={cameraScreen} />
                   <DashboardStack.Screen name="StatusViewer" component={statusViewerScreen} />
                   <DashboardStack.Screen name="SendingMoney" component={sendingMoneySecreen} />
              </DashboardStack.Navigator>
        }
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  // loading: state.auth.loading,
  user: state.auth.user,
  theme: state.auth.theme,
});

export default connect(mapStateToProps)(AppNavigator);
